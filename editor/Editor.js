Editor = function(a, b, c, f, p) {
    mxEventSource.call(this);
    this.chromeless = null != a ? a : this.chromeless;
    this.initStencilRegistry();
    this.graph = f || this.createGraph(b, c);
    this.editable = null != p ? p : !a;
    this.undoManager = this.createUndoManager();
    this.status = "";
    this.getOrCreateFilename = function() {
        return this.filename || mxResources.get("drawing", [Editor.pageCounter]) + ".xml"
    };
    this.getFilename = function() {
        return this.filename
    };
    this.setStatus = function(a) {
        this.status = a;
        this.fireEvent(new mxEventObject("statusChanged"))
    };
    this.getStatus =
        function() {
            return this.status
        };
    this.graphChangeListener = function(a, d) {
        a = null != d ? d.getProperty("edit") : null;
        null != a && a.ignoreEdit || this.setModified(!0)
    };
    this.graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
        this.graphChangeListener.apply(this, arguments)
    }));
    this.graph.resetViewOnRootChange = !1;
    this.init()
};
Editor.pageCounter = 0;
(function() {
    try {
        for (var a = window; null != a.opener && "undefined" !== typeof a.opener.Editor && !isNaN(a.opener.Editor.pageCounter) && a.opener != a;) a = a.opener;
        null != a && (a.Editor.pageCounter++, Editor.pageCounter = a.Editor.pageCounter)
    } catch (b) {}
})();
Editor.useLocalStorage = "undefined" != typeof Storage && mxClient.IS_IOS;
Editor.moveImage = mxClient.IS_SVG ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI4cHgiIGhlaWdodD0iMjhweCI+PGc+PC9nPjxnPjxnPjxnPjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNCwyLjQpc2NhbGUoMC44KXJvdGF0ZSg0NSwxMiwxMikiIHN0cm9rZT0iIzI5YjZmMiIgZmlsbD0iIzI5YjZmMiIgZD0iTTE1LDNsMi4zLDIuM2wtMi44OSwyLjg3bDEuNDIsMS40MkwxOC43LDYuN0wyMSw5VjNIMTV6IE0zLDlsMi4zLTIuM2wyLjg3LDIuODlsMS40Mi0xLjQyTDYuNyw1LjNMOSwzSDNWOXogTTksMjEgbC0yLjMtMi4zbDIuODktMi44N2wtMS40Mi0xLjQyTDUuMywxNy4zTDMsMTV2Nkg5eiBNMjEsMTVsLTIuMywyLjNsLTIuODctMi44OWwtMS40MiwxLjQybDIuODksMi44N0wxNSwyMWg2VjE1eiIvPjwvZz48L2c+PC9nPjwvc3ZnPgo=" : IMAGE_PATH +
    "/move.png";
Editor.rowMoveImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAEBAMAAACw6DhOAAAAGFBMVEUzMzP///9tbW1QUFCKiopBQUF8fHxfX1/IXlmXAAAAFElEQVQImWNgNVdzYBAUFBRggLMAEzYBy29kEPgAAAAASUVORK5CYII=" : IMAGE_PATH + "/thumb_horz.png";
Editor.lightHelpImage = mxClient.IS_SVG ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTExIDE4aDJ2LTJoLTJ2MnptMS0xNkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTAtMTRjLTIuMjEgMC00IDEuNzktNCA0aDJjMC0xLjEuOS0yIDItMnMyIC45IDIgMmMwIDItMyAxLjc1LTMgNWgyYzAtMi4yNSAzLTIuNSAzLTUgMC0yLjIxLTEuNzktNC00LTR6Ii8+PC9zdmc+" : IMAGE_PATH +
    "/help.png";
Editor.lightCheckmarkImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhFQAVAMQfAGxsbHx8fIqKioaGhvb29nJycvr6+sDAwJqamltbW5OTk+np6YGBgeTk5Ly8vJiYmP39/fLy8qWlpa6ursjIyOLi4vj4+N/f3+3t7fT09LCwsHZ2dubm5r6+vmZmZv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEY4NTZERTQ5QUFBMTFFMUE5MTVDOTM5MUZGMTE3M0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEY4NTZERTU5QUFBMTFFMUE5MTVDOTM5MUZGMTE3M0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Rjg1NkRFMjlBQUExMUUxQTkxNUM5MzkxRkYxMTczRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Rjg1NkRFMzlBQUExMUUxQTkxNUM5MzkxRkYxMTczRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAB8ALAAAAAAVABUAAAVI4CeOZGmeaKqubKtylktSgCOLRyLd3+QJEJnh4VHcMoOfYQXQLBcBD4PA6ngGlIInEHEhPOANRkaIFhq8SuHCE1Hb8Lh8LgsBADs=" : IMAGE_PATH +
    "/checkmark.gif";
Editor.darkHelpImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////9Du/pqAAAAFXRSTlMAT30qCJRBboyDZyCgRzUUdF46MJlgXETgAAAAeklEQVQY022O2w4DIQhEQUURda/9/28tUO2+7CQS5sgQ4F1RapX78YUwRqQjTU8ILqQfKerTKTvACJ4nLX3krt+8aS82oI8aQC4KavRgtvEW/mDvsICgA03PSGRr79MqX1YPNIxzjyqtw8ZnnRo4t5a5undtJYRywau+ds4Cyza3E6YAAAAASUVORK5CYII=";
Editor.darkCheckmarkImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAARVBMVEUAAACZmZkICAgEBASNjY2Dg4MYGBiTk5N5eXl1dXVmZmZQUFBCQkI3NzceHh4MDAykpKSJiYl+fn5sbGxaWlo/Pz8SEhK96uPlAAAAAXRSTlMAQObYZgAAAE5JREFUGNPFzTcSgDAQQ1HJGUfy/Y9K7V1qeOUfzQifCQZai1XHaz11LFysbDbzgDSSWMZiETz3+b8yNUc/MMsktxuC8XQBSncdLwz+8gCCggGXzBcozAAAAABJRU5ErkJggg==";
Editor.maximizeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMA758vX1Pw3BoAAABJSURBVAjXY8AJQkODGBhUQ0MhbAUGBiYY24CBgRnGFmZgMISwgwwDGRhEhVVBbAVmEQYGRwMmBjIAQi/CTIRd6G5AuA3dzYQBAHj0EFdHkvV4AAAAAElFTkSuQmCC";
Editor.zoomOutImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAElBMVEUAAAAAAAAsLCxxcXEhISFgYGChjTUxAAAAAXRSTlMAQObYZgAAAEdJREFUCNdjIAMwCQrB2YKCggJQJqMwA7MglK1owMBgqABVApITgLJZXFxgbIQ4Qj3CHIT5ggoIe5kgNkM1KSDYKBKqxPkDAPo5BAZBE54hAAAAAElFTkSuQmCC";
Editor.zoomInImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAElBMVEUAAAAAAAAsLCwhISFxcXFgYGBavKaoAAAAAXRSTlMAQObYZgAAAElJREFUCNdjIAMwCQrB2YKCggJQJqMIA4sglK3owMzgqABVwsDMwCgAZTMbG8PYCHGEeoQ5CPMFFRD2MkFshmpSQLBRJFSJ8wcAEqcEM2uhl2MAAAAASUVORK5CYII=";
Editor.zoomFitImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAD1BMVEUAAAAAAAAwMDBwcHBgYGC1xl09AAAAAXRSTlMAQObYZgAAAEFJREFUCNdjIAMwCQrB2YKCggJQJqMwA7MglK1owMBgqABVApITwMdGqEeYgzBfUAFhLxPEZqgmBQQbRUKFOH8AAK5OA3lA+FFOAAAAAElFTkSuQmCC";
Editor.layersImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAAaVBMVEUAAAAgICAICAgdHR0PDw8WFhYICAgLCwsXFxcvLy8ODg4uLi4iIiIqKiokJCQYGBgKCgonJycFBQUCAgIqKiocHBwcHBwODg4eHh4cHBwnJycJCQkUFBQqKiojIyMuLi4ZGRkgICAEBATOWYXAAAAAGnRSTlMAD7+fnz8/H7/ff18/77+vr5+fn39/b28fH2xSoKsAAACQSURBVBjTrYxJEsMgDARZZMAY73sgCcn/HxnhKtnk7j6oRq0psfuoyndZ/SuODkHPLzfVT6KeyPePnJ7KrnkRjWMXTn4SMnN8mXe2SSM3ts8L/ZUxxrbAULSYJJULE0Iw9pjpenoICcgcX61mGgTgtCv9Be99pzCoDhNQWQnchD1mup5++CYGcoQexajZbfwAj/0MD8ZOaUgAAAAASUVORK5CYII=";
Editor.previousImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVQ4je3UsQnCUBCA4U8hpa1NsoEjpHQJS0dxADdwEMuMIJkgA1hYChbGQgMi+JC8q4L/AB/vDu7x74cWWEZhJU44RmA1zujR5GIbXF9YNrjD/Q0bDRY4fEBZ4P4LlgTnCbAf84pUM8/9hY08tMUtEoQ1LpEgrNBFglChFXR6Q6GfwwR6AGKJMF74Vtt3AAAAAElFTkSuQmCC";
Editor.nextImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAi0lEQVQ4jeXUIQ7CUAwA0MeGxWI2yylwnALJUdBcgYvM7QYLmjOQIAkIPmJZghiIvypoUtX0tfnJL38X5ZfaEgUeUcManFBHgS0SLlhHggk3bCPBhCf2keCQR8wjwYTDp6YiZxJmOU1jGw7vGALescuBxsArNlOwd/CM1VSM/ut1qCIw+uOwiMJ+OF4CQzBCXm3hyAAAAABJRU5ErkJggg==";
Editor.editImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhCwALAIABAFdXV////yH5BAEAAAEALAAAAAALAAsAAAIZjB8AiKuc4jvLOGqzrjX6zmkWyChXaUJBAQA7" : IMAGE_PATH + "/edit.gif";
Editor.zoomOutLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA+vTcKMM96GRBHwXxi0YaX1HLrKWhiHpWEOnOr52Vb2xKSDcT19PKv5l/Ngdk8+viAAABJklEQVQ4y4WT2XaDMAxEvWD2nSSUNEnTJN3r//+9Sj7ILAY6L0ijC4ONYVZRpo6cByrz2YKSUGorGTpz71lPVHvT+avoB5wIkU/mxk8veceSuNoLg44IzziXjvpih72wKQnm8yc2UoiP/LAd8jQfe2Xf4Pq+2EyYIvv9wbzHHCgwxDdlBtWZOdqDfTCVgqpygQpsZaojVAVc9UjQxnAJDIBhiQv84tq3gMQCAVTxVoSibXJf8tMuc7e1TB/DCmejBNg/w1Y3c+AM5vv4w7xM59/oXamrHaLVqPQ+OTCnmMZxgz0SdL5zji0/ld6j88qGa5KIiBB6WeJGKfUKwSMKLuXgvl1TW0tm5R9UQL/efSDYsnzxD8CinhBsTTdugJatKpJwf8v+ADb8QmvW7AeAAAAAAElFTkSuQmCC";
Editor.zoomInLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA+vTcKMM96GRBHwXxi0YaX1HLrKWhiHpWEOnOr52Vb2xKSDcT19PKv5l/Ngdk8+viAAABKElEQVQ4y4WT6WKCMBCENwkBwn2oFKvWqr3L+79es4EkQIDOH2d3Pxk2ABiJlB8JCXjqw4LikHVGLHTm3nM3UeVN5690GBBN0GwyV/3kkrUQR+WeKnREeKpzaXWd77CmJiXGfPIEI4V4yQ9TIW/ntlcMBe731Vts9w5TWG8F5j3mQI4hvrKpdGeYA7CX9qAcl650gVJartxRuhyHVghF8idQAIbFLvCLu28BsQEC6aKtCK6Pyb3JT7PmbmtNH8Ny56CotD/2qOs5cJbuffxgXmCib+xddVU5RNOhkvvkhTlFehzVWCOh3++MYElOhfdovaImnRYVmqDdsuhNp1QrBBE6uGC2+3ZNjGdg5B94oD+9uyVgWT79BwAxEBTWdOu3bWBVgsn/N/AHUD9IC01Oe40AAAAASUVORK5CYII=";
Editor.actualSizeLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA+vTcKMM96GRBHwXxi0YaX1HLrKWhiHpWEOnOr52Vb2xKSDcT19PKv5l/Ngdk8+viAAABIUlEQVQ4y4WT2XqDIBCFBxDc9yTWNEnTJN3r+79eGT4BEbXnaubMr8dBBaM450dCQp4LWFAascGIRd48eB4cNYE7f6XjgGiCFs5c+dml6CFN6j1V6IQIlHPpdV/usKcmJcV88gQTRXjLD9Mhb+fWq8YG9/uCmTCFjeeDeY85UGKIUGUuqzN42kv7oCouq9oHamlzVR1lVfpAIu1QVRiW+sAv7r4FpAYIZZVsRXB9TP5Dfpo1d1trCgzz1iiptH/sUbdz4CzN9+mLeXHn3+hdddd4RDegsrvzwZwSs2GLPRJidAqCLTlVwaMPqpYMWjTWBB2WRW86pVkhSKyDK2bdt2tmagZG4sBD/evdLQHLEvQfAOKRoLCmG1FAB6uKmby+gz+REDn7O5+EwQAAAABJRU5ErkJggg==";
Editor.printLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAXVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9RKvvlAAAAHnRSTlMAydnl77qbMLT093H7K4Nd4Ktn082+lYt5bkklEgP44nQSAAAApUlEQVQ4y73P2Q6DIBRF0cOgbRHHzhP//5m9mBAQKjG1cT0Yc7ITAMu1LNQgUZiQ2DYoNQ0sCQb6qgHAfRx48opq3J9AZ6xuF7uOew8Ik1OsCZRS2UAC9V+D9a+QZYxNA45YFQftPtSkATOhw7dAc0vPBwKWiIOjP0JZ0yMuQJ27g36DipOUsqRAM0dR8KD1/ILHaHSE/w8DIx09E3g/BTce6rHUB5sAPKvfF+JdAAAAAElFTkSuQmCC";
Editor.layersLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAmVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7///+bnZkkAAAAMnRSTlMABPr8ByiD88KsTi/rvJb272mjeUA1CuPe1M/KjVxYHxMP6KZ0S9nYzGRGGRaznpGIbzaGUf0AAAHESURBVDjLbZLZYoIwEEVDgLCjbKIgAlqXqt3m/z+uNwu1rcyDhjl3ktnYL7OY254C0VX3yWFZfzDrOClbbgKxi0YDHjwl4jbnRkXxJS/C1YP3DbBhD1n7Ex4uaAqdVDb3yJ/4J/3nJD2to/ngQz/DfUvzMp4JJ5sSCaF5oXmemgQDfDxzbi+Kq4sU+vNcuAmx94JtyOP2DD4Epz2asWSCz4Z/4fECxyNj9zC9xNLHcdPEO+awDKeSaUu0W4twZQiO2hYVisTR3RCtK/c1X6t4xMEpiGqXqVntEBLolkZZsKY4QtwH6jzq67dEHlJysB1aNOD3XT7n1UkasQN59L4yC2RELMDSeCRtz3yV22Ub3ozIUTknYx8JWqDdQxbUes98cR2kZtUSveF/bAhcedwEWmlxIkpZUy4XOCb6VBjjxHvbwo/1lBAHHi2JCr0NI570QhyHq/DhJoE2lLgyA4RVe6KmZ47O/3b86MCP0HWa73A8/C3SUc5Qc1ajt6fgpXJ+RGpMvDSchepZDOOQRcZVIKcK90x2D7etqtI+56+u6n3sPriO6nfphitR4+O2m3EbM7lh3me1FM1o+LMI887rN+s3/wZdTFlpNVJiOAAAAABJRU5ErkJggg==";
Editor.closeLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAuvAIg/dDM/QlOeuFhj0S5s4vKgzjxJRQNiLSey0AAADNSURBVDjLfZLbEoMgDEQjRRRs1XqX///QNmOHJSnjPkHOGR7IEmeoGtJZstnwjqbRfIsmgEdtPCqe9Ynz7ZSc07rE2QiSc+qv8TvjRXA2PDUm3dpe82iJhOEUfxJJo3aCv+jKmRmH4lcCjCjeh9GWOdL/GZZkXH3PYYDrHBnfc4D/RVZf5sjoC1was+Y6HQxwaUxFvq/a0Pv343VCTxfBSRiB+ab3M3eiQZXmMNBJ3Y8pGRZtYQ7DgHMXJEdPLTaN/qBjzJOBc3nmNcbsA16bMR0oLqf+AAAAAElFTkSuQmCC";
Editor.editLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAgVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9d3yJTAAAAKnRSTlMA+hzi3nRQWyXzkm0h2j3u54gzEgSXjlYoTBgJxL2loGpAOS3Jt7Wxm35Ga7gRAAAA6UlEQVQ4y63Q2XaCMBSF4Q0JBasoQ5DJqbXjfv8HbCK2BZNwo/8FXHx7rcMC7lQu0iX8qU/qtvAWCpoqH8dYzS0SwaV5eK/UAf8X9pd2CWKzuF5Jrftp1owXwnIGLUaL3PYndOHf4kNNXWrXK/m7CHunk7K8LE6YtBpcknwG9GKxnroY+ylBXcx4xKyx/u/EuXi509cP9V7OO1oyHnzrdFTcqLG/4ibBA5pIMr/4xvKzuQDkVy9wW8SgBFD6HDvuzMvrZcC9QlkfMzI7w64m+b4PqBMNHB05lH21PVxJo2/fBXxV4hB38PcD+5AkI4FuETsAAAAASUVORK5CYII=";
Editor.previousLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMA7fci493c0MW8uJ6CZks4MxQHEZL6ewAAAFZJREFUOMvdkskRgDAMA4lDwg2B7b9XOlge/KKvdsa25KFb5XlRvxXC/DNBEv8IFNjBgGdDgXtFgTyhwDXiQAUHCvwa4Uv6mR6UR+1led2mVonvl+tML45qCQNQLIx7AAAAAElFTkSuQmCC";
Editor.nextLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMA7fci493c0MW8uJ6CZks4MxQHEZL6ewAAAFRJREFUOMvd0skRgCAQBVEFwQ0V7fxzNQP6wI05v6pZ/kyj1b7FNgik2gQzzLcAwiUAigHOTwDHK4A1CmB5BJANJG1hQ9qafYcqFlZP3IFc9eVGrR+iIgkDQRUXIAAAAABJRU5ErkJggg==";
Editor.refreshLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMABfyE2QKU+dfNyyDyoVYKwnTv7N+6rntsYlFNQjEqEw316uSzf2c1JB3GvqebiVw6GAjQB4DQr10AAAE7SURBVDjLvZLXcoMwEABPIgRCx3TT3A3udqL//7UgAdGRcR4yk8k+idsdmgS/QyWEqD/axS2JDV33zlnzLHIzQ2MDq9OeJ3m8l76KKENYlxrmM/b65Ys1+8YxnTEZFIEY0vVhszFWfUGZDJpQTDznTgAe5k4XhQxILB7ruzBQn+kkyDXuHfRtjoYDEvH7J9Lz98dBZXXL94X0Ofco2PFlChKbjVzEdakoSlKjoNoqPYkJ/wUZAYwc+PpLj1Ei7+jdoBWlwQZoJv2H1w3CWgRvo7dd9DP5btgwCWz0M02+oVoxCcIWeY9PNmR6B++m9prMxYEISpCBYBlfy9bc745is7UUULAem1Ww7FfalsiA2uaJsgmWP3pQI9q9/yMLkaaHAp2fxhHff/cNq7dBdHXhGW7l+Mo2zU0Cf8knJ2xA0oJ8enwAAAAASUVORK5CYII=";
Editor.backLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAclBMVEUAAAD////////////////+/v7////////////////////////////////////////////+/v7///////////////////////////////////////////////////////////////////////////////8vKLfTAAAAJXRSTlMACh7h9gby3NLIwzwZ55uVJgH57b+8tbCljYV1RRMQ46FrTzQw+vtxOQAAAJ5JREFUOMuF00cWgzAQA1DRDQFCbwFSdf8rZpdVrNH2z3tuMv7mldZQ2WN2yi8x+TT8JvyTkqvwpiKvwsOIrA1fWr+XGTklfj8dOQR+D3KyUF6QufBkJN0hfCazEv6sZBRCJDUcPasGKpu1RLtYE8lkHAPBQLoTsK/SfAyRw5FjAuhCzC2MSj0gJ+66lHatgXdKboD9tfREB5m9/+3iC9jHDYvsGNcUAAAAAElFTkSuQmCC";
Editor.fullscreenLargeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAllBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AJcWoAAAAMXRSTlMA+wIFxPWPCIb446tnUxmsoIykgxTe29jQnpKBe2MNsZhVTR/KyLuWbFhEPjUq7L9z+bQj+gAAAWxJREFUOMttk4l2gkAMRTODCO4FtQgIbnWpS9v8/881iZFh8R51NO8GJ+gAjMN8zuTRFSw04cIOHQcqFHH6oaQFGxf0jeBjEgB8Y52TpW9Ag4zB5QICWOtHrgwGuFZBcw+gPP0MFS7+iiD5inOmDIQS9sZgTwUzwEzyxhxHVEEU7NdDUXsqUPtqjIgR2IZSCT4upzSeIeOdcMHnfDsx3giPoezfU6MrQGB5//SckLEG2xYscK4GfnUFqaix39zrwooaOD/cXoYuvHKQIc7pzd3HVPusp6t2FAW/RmjMonbl8vwHDeZo/GkleJC7e+p5XA/rAq1X/V10wKag04rBpa2/d0LL4OYYceOEtsG5jyMntI1wS+N1BGcQBl/CoLoPOl9ABrW/BP53e1bwSJHHlkIVchJwmHwyyfJ4kIvEnKtwkxNSEct83KSChT7WiWgDZ3ccZ0BM4tloJow2YUAtifNT3njnyD+y/pMsnP4DN3Y4yl1Gyk0AAAAASUVORK5CYII=";
Editor.roughFillStyles = [{
    val: "auto",
    dispName: "Auto"
}, {
    val: "hachure",
    dispName: "Hachure"
}, {
    val: "solid",
    dispName: "Solid"
}, {
    val: "zigzag",
    dispName: "ZigZag"
}, {
    val: "cross-hatch",
    dispName: "Cross Hatch"
}, {
    val: "dots",
    dispName: "Dots"
}, {
    val: "dashed",
    dispName: "Dashed"
}, {
    val: "zigzag-line",
    dispName: "ZigZag Line"
}];
Editor.themes = null;
Editor.ctrlKey = mxClient.IS_MAC ? "Cmd" : "Ctrl";
Editor.hintOffset = 20;
Editor.fitWindowBorders = null;
Editor.popupsAllowed = !0;
Editor.simpleLabels = !1;
Editor.enableNativeCipboard = window == window.top && !mxClient.IS_FF && null != navigator.clipboard;
Editor.darkMode = !1;
Editor.isDarkMode = function(a) {
    return "dark" == Editor.darkMode
};
Editor.helpImage = Editor.isDarkMode() && mxClient.IS_SVG ? Editor.darkHelpImage : Editor.lightHelpImage;
Editor.checkmarkImage = Editor.isDarkMode() && mxClient.IS_SVG ? Editor.darkCheckmarkImage : Editor.lightCheckmarkImage;
mxUtils.extend(Editor, mxEventSource);
Editor.prototype.originalNoForeignObject = mxClient.NO_FO;
Editor.prototype.transparentImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhMAAwAIAAAP///wAAACH5BAEAAAAALAAAAAAwADAAAAIxhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8egpAAA7" : IMAGE_PATH + "/transparent.gif";
Editor.prototype.extendCanvas = !0;
Editor.prototype.chromeless = !1;
Editor.prototype.cancelFirst = !0;
Editor.prototype.enabled = !0;
Editor.prototype.filename = null;
Editor.prototype.modified = !1;
Editor.prototype.autosave = !0;
Editor.prototype.initialTopSpacing = 0;
Editor.prototype.appName = document.title;
Editor.prototype.editBlankUrl = window.location.protocol + "//" + window.location.host + "/";
Editor.prototype.defaultGraphOverflow = "hidden";
Editor.prototype.init = function() {};
Editor.prototype.isChromelessView = function() {
    return this.chromeless
};
Editor.prototype.setAutosave = function(a) {
    this.autosave = a;
    this.fireEvent(new mxEventObject("autosaveChanged"))
};
Editor.prototype.getEditBlankUrl = function(a) {
    return this.editBlankUrl + a
};
Editor.prototype.editAsNew = function(a, b) {
    b = null != b ? "?title=" + encodeURIComponent(b) : "";
    null != urlParams.ui && (b += (0 < b.length ? "&" : "?") + "ui=" + urlParams.ui);
    if ("undefined" !== typeof window.postMessage && (null == document.documentMode || 10 <= document.documentMode)) {
        var c = null,
            f = mxUtils.bind(this, function(b) {
                "ready" == b.data && b.source == c && (mxEvent.removeListener(window, "message", f), c.postMessage(a, "*"))
            });
        mxEvent.addListener(window, "message", f);
        c = this.graph.openLink(this.getEditBlankUrl(b + (0 < b.length ? "&" : "?") + "client=1"),
            null, !0)
    } else this.graph.openLink(this.getEditBlankUrl(b) + "#R" + encodeURIComponent(a))
};
Editor.prototype.createGraph = function(a, b) {
    a = new Graph(null, b, null, null, a);
    a.transparentBackground = !1;
    this.chromeless || (a.isBlankLink = function(a) {
        return !this.isExternalProtocol(a)
    });
    return a
};
Editor.prototype.resetGraph = function() {
    this.graph.gridEnabled = this.graph.defaultGridEnabled && (!this.isChromelessView() || "1" == urlParams.grid);
    this.graph.graphHandler.guidesEnabled = !0;
    this.graph.setTooltips(!0);
    this.graph.setConnectable(!0);
    this.graph.foldingEnabled = !0;
    this.graph.scrollbars = this.graph.defaultScrollbars;
    this.graph.pageVisible = this.graph.defaultPageVisible;
    this.graph.pageBreaksVisible = this.graph.pageVisible;
    this.graph.preferPageSize = this.graph.pageBreaksVisible;
    this.graph.background =
        null;
    this.graph.pageScale = mxGraph.prototype.pageScale;
    this.graph.pageFormat = mxGraph.prototype.pageFormat;
    this.graph.currentScale = 1;
    this.graph.currentTranslate.x = 0;
    this.graph.currentTranslate.y = 0;
    this.updateGraphComponents();
    this.graph.view.setScale(1)
};
Editor.prototype.readGraphState = function(a) {
    var b = a.getAttribute("grid");
    if (null == b || "" == b) b = this.graph.defaultGridEnabled ? "1" : "0";
    this.graph.gridEnabled = "0" != b && (!this.isChromelessView() || "1" == urlParams.grid);
    this.graph.gridSize = parseFloat(a.getAttribute("gridSize")) || mxGraph.prototype.gridSize;
    this.graph.graphHandler.guidesEnabled = "0" != a.getAttribute("guides");
    this.graph.setTooltips("0" != a.getAttribute("tooltips"));
    this.graph.setConnectable("0" != a.getAttribute("connect"));
    this.graph.connectionArrowsEnabled =
        "0" != a.getAttribute("arrows");
    this.graph.foldingEnabled = "0" != a.getAttribute("fold");
    this.isChromelessView() && this.graph.foldingEnabled && (this.graph.foldingEnabled = "1" == urlParams.nav, this.graph.cellRenderer.forceControlClickHandler = this.graph.foldingEnabled);
    b = parseFloat(a.getAttribute("pageScale"));
    !isNaN(b) && 0 < b ? this.graph.pageScale = b : this.graph.pageScale = mxGraph.prototype.pageScale;
    this.graph.isLightboxView() || this.graph.isViewer() ? this.graph.pageVisible = !1 : (b = a.getAttribute("page"), this.graph.pageVisible =
        null != b ? "0" != b : this.graph.defaultPageVisible);
    this.graph.pageBreaksVisible = this.graph.pageVisible;
    this.graph.preferPageSize = this.graph.pageBreaksVisible;
    b = parseFloat(a.getAttribute("pageWidth"));
    var c = parseFloat(a.getAttribute("pageHeight"));
    isNaN(b) || isNaN(c) || (this.graph.pageFormat = new mxRectangle(0, 0, b, c));
    a = a.getAttribute("background");
    this.graph.background = null != a && 0 < a.length ? a : null
};
Editor.prototype.setGraphXml = function(a) {
    if (null != a) {
        var b = new mxCodec(a.ownerDocument);
        if ("mxGraphModel" == a.nodeName) {
            this.graph.model.beginUpdate();
            try {
                this.graph.model.clear(), this.graph.view.scale = 1, this.readGraphState(a), this.updateGraphComponents(), b.decode(a, this.graph.getModel())
            } finally {
                this.graph.model.endUpdate()
            }
            this.fireEvent(new mxEventObject("resetGraphView"))
        } else if ("root" == a.nodeName) {
            this.resetGraph();
            var c = b.document.createElement("mxGraphModel");
            c.appendChild(a);
            b.decode(c, this.graph.getModel());
            this.updateGraphComponents();
            this.fireEvent(new mxEventObject("resetGraphView"))
        } else throw {
            message: mxResources.get("cannotOpenFile"),
            node: a,
            toString: function() {
                return this.message
            }
        };
    } else this.resetGraph(), this.graph.model.clear(), this.fireEvent(new mxEventObject("resetGraphView"))
};
Editor.prototype.getGraphXml = function(a) {
    a = (null != a ? a : 1) ? (new mxCodec(mxUtils.createXmlDocument())).encode(this.graph.getModel()) : this.graph.encodeCells(mxUtils.sortCells(this.graph.model.getTopmostCells(this.graph.getSelectionCells())));
    if (0 != this.graph.view.translate.x || 0 != this.graph.view.translate.y) a.setAttribute("dx", Math.round(100 * this.graph.view.translate.x) / 100), a.setAttribute("dy", Math.round(100 * this.graph.view.translate.y) / 100);
    a.setAttribute("grid", this.graph.isGridEnabled() ? "1" : "0");
    a.setAttribute("gridSize",
        this.graph.gridSize);
    a.setAttribute("guides", this.graph.graphHandler.guidesEnabled ? "1" : "0");
    a.setAttribute("tooltips", this.graph.tooltipHandler.isEnabled() ? "1" : "0");
    a.setAttribute("connect", this.graph.connectionHandler.isEnabled() ? "1" : "0");
    a.setAttribute("arrows", this.graph.connectionArrowsEnabled ? "1" : "0");
    a.setAttribute("fold", this.graph.foldingEnabled ? "1" : "0");
    a.setAttribute("page", this.graph.pageVisible ? "1" : "0");
    a.setAttribute("pageScale", this.graph.pageScale);
    a.setAttribute("pageWidth", this.graph.pageFormat.width);
    a.setAttribute("pageHeight", this.graph.pageFormat.height);
    null != this.graph.background && a.setAttribute("background", this.graph.background);
    return a
};
Editor.prototype.updateGraphComponents = function() {
    var a = this.graph;
    null != a.container && (a.view.validateBackground(), a.container.style.overflow = a.scrollbars ? "auto" : this.defaultGraphOverflow, this.fireEvent(new mxEventObject("updateGraphComponents")))
};
Editor.prototype.setModified = function(a) {
    this.modified = a
};
Editor.prototype.setFilename = function(a) {
    this.filename = a
};
Editor.prototype.createUndoManager = function() {
    var a = this.graph,
        b = new mxUndoManager;
    this.undoListener = function(a, c) {
        b.undoableEditHappened(c.getProperty("edit"))
    };
    var c = mxUtils.bind(this, function(a, b) {
        this.undoListener.apply(this, arguments)
    });
    a.getModel().addListener(mxEvent.UNDO, c);
    a.getView().addListener(mxEvent.UNDO, c);
    c = function(b, c) {
        b = a.getSelectionCellsForChanges(c.getProperty("edit").changes, function(a) {
            return !(a instanceof mxChildChange)
        });
        if (0 < b.length) {
            a.getModel();
            c = [];
            for (var g = 0; g < b.length; g++) null !=
                a.view.getState(b[g]) && c.push(b[g]);
            a.setSelectionCells(c)
        }
    };
    b.addListener(mxEvent.UNDO, c);
    b.addListener(mxEvent.REDO, c);
    return b
};
Editor.prototype.initStencilRegistry = function() {};
Editor.prototype.destroy = function() {
    null != this.graph && (this.graph.destroy(), this.graph = null)
};
OpenFile = function(a) {
    this.consumer = this.producer = null;
    this.done = a;
    this.args = null
};
OpenFile.prototype.setConsumer = function(a) {
    this.consumer = a;
    this.execute()
};
OpenFile.prototype.setData = function() {
    this.args = arguments;
    this.execute()
};
OpenFile.prototype.error = function(a) {
    this.cancel(!0);
    mxUtils.alert(a)
};
OpenFile.prototype.execute = function() {
    null != this.consumer && null != this.args && (this.cancel(!1), this.consumer.apply(this, this.args))
};
OpenFile.prototype.cancel = function(a) {
    null != this.done && this.done(null != a ? a : !0)
};

function Dialog(a, b, c, f, p, g, d, e, m, k, h) {
    var n = c,
        l = f,
        u = mxUtils.getDocumentSize();
    null != window.innerHeight && (u.height = window.innerHeight);
    var t = u.height,
        q = Math.max(1, Math.round((u.width - c - 64) / 2)),
        r = Math.max(1, Math.round((t - f - a.footerHeight) / 3));
    b.style.maxHeight = "100%";
    c = null != document.body ? Math.min(c, document.body.scrollWidth - 64) : c;
    f = Math.min(f, t - 64);
    0 < a.dialogs.length && (this.zIndex += 2 * a.dialogs.length);
    null == this.bg && (this.bg = a.createDiv("background"), this.bg.style.position = "absolute", this.bg.style.background =
        Dialog.backdropColor, this.bg.style.height = t + "px", this.bg.style.right = "0px", this.bg.style.zIndex = this.zIndex - 2, mxUtils.setOpacity(this.bg, this.bgOpacity));
    u = mxUtils.getDocumentScrollOrigin(document);
    this.bg.style.left = u.x + "px";
    this.bg.style.top = u.y + "px";
    q += u.x;
    r += u.y;
    p && document.body.appendChild(this.bg);
    var v = a.createDiv(m ? "geTransDialog" : "geDialog");
    p = this.getPosition(q, r, c, f);
    q = p.x;
    r = p.y;
    v.style.width = c + "px";
    v.style.height = f + "px";
    v.style.left = q + "px";
    v.style.top = r + "px";
    v.style.zIndex = this.zIndex;
    v.appendChild(b);
    document.body.appendChild(v);
    !e && b.clientHeight > v.clientHeight - 64 && (b.style.overflowY = "auto");
    if (g && (g = document.createElement("img"), g.setAttribute("src", Dialog.prototype.closeImage), g.setAttribute("title", mxResources.get("close")), g.className = "geDialogClose", g.style.top = r + 14 + "px", g.style.left = q + c + 38 - 0 + "px", g.style.zIndex = this.zIndex, mxEvent.addListener(g, "click", mxUtils.bind(this, function() {
            a.hideDialog(!0)
        })), document.body.appendChild(g), this.dialogImg = g, !h)) {
        var w = !1;
        mxEvent.addGestureListeners(this.bg,
            mxUtils.bind(this, function(a) {
                w = !0
            }), null, mxUtils.bind(this, function(d) {
                w && (a.hideDialog(!0), w = !1)
            }))
    }
    this.resizeListener = mxUtils.bind(this, function() {
        if (null != k) {
            var d = k();
            null != d && (n = c = d.w, l = f = d.h)
        }
        d = mxUtils.getDocumentSize();
        t = d.height;
        this.bg.style.height = t + "px";
        q = Math.max(1, Math.round((d.width - c - 64) / 2));
        r = Math.max(1, Math.round((t - f - a.footerHeight) / 3));
        c = null != document.body ? Math.min(n, document.body.scrollWidth - 64) : n;
        f = Math.min(l, t - 64);
        d = this.getPosition(q, r, c, f);
        q = d.x;
        r = d.y;
        v.style.left = q + "px";
        v.style.top = r + "px";
        v.style.width = c + "px";
        v.style.height = f + "px";
        !e && b.clientHeight > v.clientHeight - 64 && (b.style.overflowY = "auto");
        null != this.dialogImg && (this.dialogImg.style.top = r + 14 + "px", this.dialogImg.style.left = q + c + 38 - 0 + "px")
    });
    mxEvent.addListener(window, "resize", this.resizeListener);
    this.onDialogClose = d;
    this.container = v;
    a.editor.fireEvent(new mxEventObject("showDialog"))
}
Dialog.backdropColor = "white";
Dialog.prototype.zIndex = mxPopupMenu.prototype.zIndex - 1;
Dialog.prototype.noColorImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzRDlBMUUwODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzRDlBMUUxODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTNEOUExREU4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNEOUExREY4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xh3fmAAAABlBMVEX////MzMw46qqDAAAAGElEQVR42mJggAJGKGAYIIGBth8KAAIMAEUQAIElnLuQAAAAAElFTkSuQmCC" :
    IMAGE_PATH + "/nocolor.png";
Dialog.prototype.closeImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAABlBMVEV7mr3///+wksspAAAAAnRSTlP/AOW3MEoAAAAdSURBVAgdY9jXwCDDwNDRwHCwgeExmASygSL7GgB12QiqNHZZIwAAAABJRU5ErkJggg==" : IMAGE_PATH + "/close.png";
Dialog.prototype.clearImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhDQAKAIABAMDAwP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUIzOEM1NzI4NjEyMTFFMUEzMkNDMUE3NjZERDE2QjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUIzOEM1NzM4NjEyMTFFMUEzMkNDMUE3NjZERDE2QjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjM4QzU3MDg2MTIxMUUxQTMyQ0MxQTc2NkREMTZCMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjM4QzU3MTg2MTIxMUUxQTMyQ0MxQTc2NkREMTZCMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAANAAoAAAIXTGCJebD9jEOTqRlttXdrB32PJ2ncyRQAOw==" : IMAGE_PATH +
    "/clear.gif";
Dialog.prototype.lockedImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzdDMDZCODExNzIxMTFFNUI0RTk5NTg4OTcyMUUyODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzdDMDZCODIxNzIxMTFFNUI0RTk5NTg4OTcyMUUyODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozN0MwNkI3RjE3MjExMUU1QjRFOTk1ODg5NzIxRTI4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozN0MwNkI4MDE3MjExMUU1QjRFOTk1ODg5NzIxRTI4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvqMCFYAAAAVUExURZmZmb+/v7KysqysrMzMzLGxsf///4g8N1cAAAAHdFJOU////////wAaSwNGAAAAPElEQVR42lTMQQ4AIQgEwUa0//9kTQirOweYOgDqAMbZUr10AGlAwx4/BJ2QJ4U0L5brYjovvpv32xZgAHZaATFtMbu4AAAAAElFTkSuQmCC" : IMAGE_PATH +
    "/locked.png";
Dialog.prototype.unlockedImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzdDMDZCN0QxNzIxMTFFNUI0RTk5NTg4OTcyMUUyODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzdDMDZCN0UxNzIxMTFFNUI0RTk5NTg4OTcyMUUyODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozN0MwNkI3QjE3MjExMUU1QjRFOTk1ODg5NzIxRTI4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozN0MwNkI3QzE3MjExMUU1QjRFOTk1ODg5NzIxRTI4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkKMpVwAAAAYUExURZmZmbKysr+/v6ysrOXl5czMzLGxsf///zHN5lwAAAAIdFJOU/////////8A3oO9WQAAADxJREFUeNpUzFESACAEBNBVsfe/cZJU+8Mzs8CIABCidtfGOndnYsT40HDSiCcbPdoJo10o9aI677cpwACRoAF3dFNlswAAAABJRU5ErkJggg==" : IMAGE_PATH +
    "/unlocked.png";
Dialog.prototype.bgOpacity = 80;
Dialog.prototype.getPosition = function(a, b) {
    return new mxPoint(a, b)
};
Dialog.prototype.close = function(a, b) {
    if (null != this.onDialogClose) {
        if (0 == this.onDialogClose(a, b)) return !1;
        this.onDialogClose = null
    }
    null != this.dialogImg && (this.dialogImg.parentNode.removeChild(this.dialogImg), this.dialogImg = null);
    null != this.bg && null != this.bg.parentNode && this.bg.parentNode.removeChild(this.bg);
    mxEvent.removeListener(window, "resize", this.resizeListener);
    this.container.parentNode.removeChild(this.container)
};
var ErrorDialog = function(a, b, c, f, p, g, d, e, m, k, h) {
        m = null != m ? m : !0;
        var n = document.createElement("div");
        n.style.textAlign = "center";
        if (null != b) {
            var l = document.createElement("div");
            l.style.padding = "0px";
            l.style.margin = "0px";
            l.style.fontSize = "18px";
            l.style.paddingBottom = "16px";
            l.style.marginBottom = "10px";
            l.style.borderBottom = "1px solid #c0c0c0";
            l.style.color = "gray";
            l.style.whiteSpace = "nowrap";
            l.style.textOverflow = "ellipsis";
            l.style.overflow = "hidden";
            mxUtils.write(l, b);
            l.setAttribute("title", b);
            n.appendChild(l)
        }
        b =
            document.createElement("div");
        b.style.lineHeight = "1.2em";
        b.style.padding = "6px";
        b.innerHTML = c;
        n.appendChild(b);
        c = document.createElement("div");
        c.style.marginTop = "12px";
        c.style.textAlign = "center";
        null != g && (b = mxUtils.button(mxResources.get("tryAgain"), function() {
            a.hideDialog();
            g()
        }), b.className = "geBtn", c.appendChild(b), c.style.textAlign = "center");
        null != k && (k = mxUtils.button(k, function() {
            null != h && h()
        }), k.className = "geBtn", c.appendChild(k));
        var u = mxUtils.button(f, function() {
            m && a.hideDialog();
            null != p && p()
        });
        u.className = "geBtn";
        c.appendChild(u);
        null != d && (f = mxUtils.button(d, function() {
            m && a.hideDialog();
            null != e && e()
        }), f.className = "geBtn gePrimaryBtn", c.appendChild(f));
        this.init = function() {
            u.focus()
        };
        n.appendChild(c);
        this.container = n
    },
    PrintDialog = function(a, b) {
        this.create(a, b)
    };
PrintDialog.prototype.create = function(a) {
    function b(a) {
        var e = d.checked || k.checked,
            b = parseInt(n.value) / 100;
        isNaN(b) && (b = 1, n.value = "100%");
        b *= .75;
        var m = c.pageFormat || mxConstants.PAGE_FORMAT_A4_PORTRAIT,
            g = 1 / c.pageScale;
        if (e) {
            var f = d.checked ? 1 : parseInt(h.value);
            isNaN(f) || (g = mxUtils.getScaleForPageCount(f, c, m))
        }
        c.getGraphBounds();
        var l = f = 0;
        m = mxRectangle.fromRectangle(m);
        m.width = Math.ceil(m.width * b);
        m.height = Math.ceil(m.height * b);
        g *= b;
        !e && c.pageVisible ? (b = c.getPageLayout(), f -= b.x * m.width, l -= b.y * m.height) :
            e = !0;
        e = PrintDialog.createPrintPreview(c, g, m, 0, f, l, e);
        e.open();
        a && PrintDialog.printPreview(e)
    }
    var c = a.editor.graph,
        f = document.createElement("table");
    f.style.width = "100%";
    f.style.height = "100%";
    var p = document.createElement("tbody");
    var g = document.createElement("tr");
    var d = document.createElement("input");
    d.setAttribute("type", "checkbox");
    var e = document.createElement("td");
    e.setAttribute("colspan", "2");
    e.style.fontSize = "10pt";
    e.appendChild(d);
    var m = document.createElement("span");
    mxUtils.write(m, " " + mxResources.get("fitPage"));
    e.appendChild(m);
    mxEvent.addListener(m, "click", function(a) {
        d.checked = !d.checked;
        k.checked = !d.checked;
        mxEvent.consume(a)
    });
    mxEvent.addListener(d, "change", function() {
        k.checked = !d.checked
    });
    g.appendChild(e);
    p.appendChild(g);
    g = g.cloneNode(!1);
    var k = document.createElement("input");
    k.setAttribute("type", "checkbox");
    e = document.createElement("td");
    e.style.fontSize = "10pt";
    e.appendChild(k);
    m = document.createElement("span");
    mxUtils.write(m, " " + mxResources.get("posterPrint") + ":");
    e.appendChild(m);
    mxEvent.addListener(m,
        "click",
        function(a) {
            k.checked = !k.checked;
            d.checked = !k.checked;
            mxEvent.consume(a)
        });
    g.appendChild(e);
    var h = document.createElement("input");
    h.setAttribute("value", "1");
    h.setAttribute("type", "number");
    h.setAttribute("min", "1");
    h.setAttribute("size", "4");
    h.setAttribute("disabled", "disabled");
    h.style.width = "50px";
    e = document.createElement("td");
    e.style.fontSize = "10pt";
    e.appendChild(h);
    mxUtils.write(e, " " + mxResources.get("pages") + " (max)");
    g.appendChild(e);
    p.appendChild(g);
    mxEvent.addListener(k, "change",
        function() {
            k.checked ? h.removeAttribute("disabled") : h.setAttribute("disabled", "disabled");
            d.checked = !k.checked
        });
    g = g.cloneNode(!1);
    e = document.createElement("td");
    mxUtils.write(e, mxResources.get("pageScale") + ":");
    g.appendChild(e);
    e = document.createElement("td");
    var n = document.createElement("input");
    n.setAttribute("value", "100 %");
    n.setAttribute("size", "5");
    n.style.width = "50px";
    e.appendChild(n);
    g.appendChild(e);
    p.appendChild(g);
    g = document.createElement("tr");
    e = document.createElement("td");
    e.colSpan = 2;
    e.style.paddingTop = "20px";
    e.setAttribute("align", "right");
    m = mxUtils.button(mxResources.get("cancel"), function() {
        a.hideDialog()
    });
    m.className = "geBtn";
    a.editor.cancelFirst && e.appendChild(m);
    if (PrintDialog.previewEnabled) {
        var l = mxUtils.button(mxResources.get("preview"), function() {
            a.hideDialog();
            b(!1)
        });
        l.className = "geBtn";
        e.appendChild(l)
    }
    l = mxUtils.button(mxResources.get(PrintDialog.previewEnabled ? "print" : "ok"), function() {
        a.hideDialog();
        b(!0)
    });
    l.className = "geBtn gePrimaryBtn";
    e.appendChild(l);
    a.editor.cancelFirst ||
        e.appendChild(m);
    g.appendChild(e);
    p.appendChild(g);
    f.appendChild(p);
    this.container = f
};
PrintDialog.printPreview = function(a) {
    try {
        if (null != a.wnd) {
            var b = function() {
                a.wnd.focus();
                a.wnd.print();
                a.wnd.close()
            };
            mxClient.IS_GC ? window.setTimeout(b, 500) : b()
        }
    } catch (c) {}
};
PrintDialog.createPrintPreview = function(a, b, c, f, p, g, d) {
    b = new mxPrintPreview(a, b, c, f, p, g);
    b.title = mxResources.get("preview");
    b.printBackgroundImage = !0;
    b.autoOrigin = d;
    a = a.background;
    if (null == a || "" == a || a == mxConstants.NONE) a = "#ffffff";
    b.backgroundColor = a;
    var e = b.writeHead;
    b.writeHead = function(a) {
        e.apply(this, arguments);
        a.writeln('<style type="text/css">');
        a.writeln("@media screen {");
        a.writeln("  body > div { padding:30px;box-sizing:content-box; }");
        a.writeln("}");
        a.writeln("</style>")
    };
    return b
};
PrintDialog.previewEnabled = !0;
var PageSetupDialog = function(a) {
    function b() {
        null == h || h == mxConstants.NONE ? (k.style.backgroundColor = "", k.style.backgroundImage = "url('" + Dialog.prototype.noColorImage + "')") : (k.style.backgroundColor = h, k.style.backgroundImage = "")
    }

    function c() {
        null == u ? (l.removeAttribute("title"), l.style.fontSize = "", l.innerHTML = mxUtils.htmlEntities(mxResources.get("change")) + "...") : (l.setAttribute("title", u.src), l.style.fontSize = "11px", l.innerHTML = mxUtils.htmlEntities(u.src.substring(0, 42)) + "...")
    }
    var f = a.editor.graph,
        p =
        document.createElement("table");
    p.style.width = "100%";
    p.style.height = "100%";
    var g = document.createElement("tbody");
    var d = document.createElement("tr");
    var e = document.createElement("td");
    e.style.verticalAlign = "top";
    e.style.fontSize = "10pt";
    mxUtils.write(e, mxResources.get("paperSize") + ":");
    d.appendChild(e);
    e = document.createElement("td");
    e.style.verticalAlign = "top";
    e.style.fontSize = "10pt";
    var m = PageSetupDialog.addPageFormatPanel(e, "pagesetupdialog", f.pageFormat);
    d.appendChild(e);
    g.appendChild(d);
    d = document.createElement("tr");
    e = document.createElement("td");
    mxUtils.write(e, mxResources.get("background") + ":");
    d.appendChild(e);
    e = document.createElement("td");
    e.style.whiteSpace = "nowrap";
    document.createElement("input").setAttribute("type", "text");
    var k = document.createElement("button");
    k.style.width = "18px";
    k.style.height = "18px";
    k.style.marginRight = "20px";
    k.style.backgroundPosition = "center center";
    k.style.backgroundRepeat = "no-repeat";
    var h = f.background;
    b();
    mxEvent.addListener(k, "click", function(d) {
        a.pickColor(h || "none", function(a) {
            h =
                a;
            b()
        });
        mxEvent.consume(d)
    });
    e.appendChild(k);
    mxUtils.write(e, mxResources.get("gridSize") + ":");
    var n = document.createElement("input");
    n.setAttribute("type", "number");
    n.setAttribute("min", "0");
    n.style.width = "40px";
    n.style.marginLeft = "6px";
    n.value = f.getGridSize();
    e.appendChild(n);
    mxEvent.addListener(n, "change", function() {
        var a = parseInt(n.value);
        n.value = Math.max(1, isNaN(a) ? f.getGridSize() : a)
    });
    d.appendChild(e);
    g.appendChild(d);
    d = document.createElement("tr");
    e = document.createElement("td");
    mxUtils.write(e,
        mxResources.get("image") + ":");
    d.appendChild(e);
    e = document.createElement("td");
    var l = document.createElement("a");
    l.style.textDecoration = "underline";
    l.style.cursor = "pointer";
    l.style.color = "#a0a0a0";
    var u = f.backgroundImage;
    mxEvent.addListener(l, "click", function(d) {
        a.showBackgroundImageDialog(function(a, d) {
            d || (u = a, c())
        }, u);
        mxEvent.consume(d)
    });
    c();
    e.appendChild(l);
    d.appendChild(e);
    g.appendChild(d);
    d = document.createElement("tr");
    e = document.createElement("td");
    e.colSpan = 2;
    e.style.paddingTop = "16px";
    e.setAttribute("align",
        "right");
    var t = mxUtils.button(mxResources.get("cancel"), function() {
        a.hideDialog()
    });
    t.className = "geBtn";
    a.editor.cancelFirst && e.appendChild(t);
    var q = mxUtils.button(mxResources.get("apply"), function() {
        a.hideDialog();
        var d = parseInt(n.value);
        isNaN(d) || f.gridSize === d || f.setGridSize(d);
        d = new ChangePageSetup(a, h, u, m.get());
        d.ignoreColor = f.background == h;
        d.ignoreImage = (null != f.backgroundImage ? f.backgroundImage.src : null) === (null != u ? u.src : null);
        f.pageFormat.width == d.previousFormat.width && f.pageFormat.height ==
            d.previousFormat.height && d.ignoreColor && d.ignoreImage || f.model.execute(d)
    });
    q.className = "geBtn gePrimaryBtn";
    e.appendChild(q);
    a.editor.cancelFirst || e.appendChild(t);
    d.appendChild(e);
    g.appendChild(d);
    p.appendChild(g);
    this.container = p
};
PageSetupDialog.addPageFormatPanel = function(a, b, c, f) {
    function p(a, b, k) {
        if (k || n != document.activeElement && l != document.activeElement) {
            a = !1;
            for (b = 0; b < t.length; b++) k = t[b], w ? "custom" == k.key && (e.value = k.key, w = !1) : null != k.format && ("a4" == k.key ? 826 == c.width ? (c = mxRectangle.fromRectangle(c), c.width = 827) : 826 == c.height && (c = mxRectangle.fromRectangle(c), c.height = 827) : "a5" == k.key && (584 == c.width ? (c = mxRectangle.fromRectangle(c), c.width = 583) : 584 == c.height && (c = mxRectangle.fromRectangle(c), c.height = 583)), c.width == k.format.width &&
                c.height == k.format.height ? (e.value = k.key, g.setAttribute("checked", "checked"), g.defaultChecked = !0, g.checked = !0, d.removeAttribute("checked"), d.defaultChecked = !1, d.checked = !1, a = !0) : c.width == k.format.height && c.height == k.format.width && (e.value = k.key, g.removeAttribute("checked"), g.defaultChecked = !1, g.checked = !1, d.setAttribute("checked", "checked"), d.defaultChecked = !0, a = d.checked = !0));
            a ? (m.style.display = "", h.style.display = "none") : (n.value = c.width / 100, l.value = c.height / 100, g.setAttribute("checked", "checked"),
                e.value = "custom", m.style.display = "none", h.style.display = "")
        }
    }
    b = "format-" + b;
    var g = document.createElement("input");
    g.setAttribute("name", b);
    g.setAttribute("type", "radio");
    g.setAttribute("value", "portrait");
    var d = document.createElement("input");
    d.setAttribute("name", b);
    d.setAttribute("type", "radio");
    d.setAttribute("value", "landscape");
    var e = document.createElement("select");
    e.style.marginBottom = "8px";
    e.style.width = "202px";
    var m = document.createElement("div");
    m.style.marginLeft = "4px";
    m.style.width = "210px";
    m.style.height = "24px";
    g.style.marginRight = "6px";
    m.appendChild(g);
    b = document.createElement("span");
    b.style.maxWidth = "100px";
    mxUtils.write(b, mxResources.get("portrait"));
    m.appendChild(b);
    d.style.marginLeft = "10px";
    d.style.marginRight = "6px";
    m.appendChild(d);
    var k = document.createElement("span");
    k.style.width = "100px";
    mxUtils.write(k, mxResources.get("landscape"));
    m.appendChild(k);
    var h = document.createElement("div");
    h.style.marginLeft = "4px";
    h.style.width = "210px";
    h.style.height = "24px";
    var n = document.createElement("input");
    n.setAttribute("size", "7");
    n.style.textAlign = "right";
    h.appendChild(n);
    mxUtils.write(h, " in x ");
    var l = document.createElement("input");
    l.setAttribute("size", "7");
    l.style.textAlign = "right";
    h.appendChild(l);
    mxUtils.write(h, " in");
    m.style.display = "none";
    h.style.display = "none";
    for (var u = {}, t = PageSetupDialog.getFormats(), q = 0; q < t.length; q++) {
        var r = t[q];
        u[r.key] = r;
        var v = document.createElement("option");
        v.setAttribute("value", r.key);
        mxUtils.write(v, r.title);
        e.appendChild(v)
    }
    var w = !1;
    p();
    a.appendChild(e);
    mxUtils.br(a);
    a.appendChild(m);
    a.appendChild(h);
    var y = c,
        x = function(a, b) {
            a = u[e.value];
            null != a.format ? (n.value = a.format.width / 100, l.value = a.format.height / 100, h.style.display = "none", m.style.display = "") : (m.style.display = "none", h.style.display = "");
            a = parseFloat(n.value);
            if (isNaN(a) || 0 >= a) n.value = c.width / 100;
            a = parseFloat(l.value);
            if (isNaN(a) || 0 >= a) l.value = c.height / 100;
            a = new mxRectangle(0, 0, Math.floor(100 * parseFloat(n.value)), Math.floor(100 * parseFloat(l.value)));
            "custom" != e.value && d.checked && (a = new mxRectangle(0, 0, a.height,
                a.width));
            b && w || a.width == y.width && a.height == y.height || (y = a, null != f && f(y))
        };
    mxEvent.addListener(b, "click", function(a) {
        g.checked = !0;
        x(a);
        mxEvent.consume(a)
    });
    mxEvent.addListener(k, "click", function(a) {
        d.checked = !0;
        x(a);
        mxEvent.consume(a)
    });
    mxEvent.addListener(n, "blur", x);
    mxEvent.addListener(n, "click", x);
    mxEvent.addListener(l, "blur", x);
    mxEvent.addListener(l, "click", x);
    mxEvent.addListener(d, "change", x);
    mxEvent.addListener(g, "change", x);
    mxEvent.addListener(e, "change", function(a) {
        w = "custom" == e.value;
        x(a,
            !0)
    });
    x();
    return {
        set: function(a) {
            c = a;
            p(null, null, !0)
        },
        get: function() {
            return y
        },
        widthInput: n,
        heightInput: l
    }
};
PageSetupDialog.getFormats = function() {
    return [{
            key: "letter",
            title: 'US-Letter (8,5" x 11")',
            format: mxConstants.PAGE_FORMAT_LETTER_PORTRAIT
        }, {
            key: "legal",
            title: 'US-Legal (8,5" x 14")',
            format: new mxRectangle(0, 0, 850, 1400)
        }, {
            key: "tabloid",
            title: 'US-Tabloid (11" x 17")',
            format: new mxRectangle(0, 0, 1100, 1700)
        }, {
            key: "executive",
            title: 'US-Executive (7" x 10")',
            format: new mxRectangle(0, 0, 700, 1E3)
        }, {
            key: "a0",
            title: "A0 (841 mm x 1189 mm)",
            format: new mxRectangle(0, 0, 3300, 4681)
        }, {
            key: "a1",
            title: "A1 (594 mm x 841 mm)",
            format: new mxRectangle(0, 0, 2339, 3300)
        }, {
            key: "a2",
            title: "A2 (420 mm x 594 mm)",
            format: new mxRectangle(0, 0, 1654, 2336)
        }, {
            key: "a3",
            title: "A3 (297 mm x 420 mm)",
            format: new mxRectangle(0, 0, 1169, 1654)
        }, {
            key: "a4",
            title: "A4 (210 mm x 297 mm)",
            format: mxConstants.PAGE_FORMAT_A4_PORTRAIT
        }, {
            key: "a5",
            title: "A5 (148 mm x 210 mm)",
            format: new mxRectangle(0, 0, 583, 827)
        }, {
            key: "a6",
            title: "A6 (105 mm x 148 mm)",
            format: new mxRectangle(0, 0, 413, 583)
        }, {
            key: "a7",
            title: "A7 (74 mm x 105 mm)",
            format: new mxRectangle(0, 0, 291, 413)
        },
        {
            key: "b4",
            title: "B4 (250 mm x 353 mm)",
            format: new mxRectangle(0, 0, 980, 1390)
        }, {
            key: "b5",
            title: "B5 (176 mm x 250 mm)",
            format: new mxRectangle(0, 0, 690, 980)
        }, {
            key: "16-9",
            title: "16:9 (1600 x 900)",
            format: new mxRectangle(0, 0, 900, 1600)
        }, {
            key: "16-10",
            title: "16:10 (1920 x 1200)",
            format: new mxRectangle(0, 0, 1200, 1920)
        }, {
            key: "4-3",
            title: "4:3 (1600 x 1200)",
            format: new mxRectangle(0, 0, 1200, 1600)
        }, {
            key: "custom",
            title: mxResources.get("custom"),
            format: null
        }
    ]
};
var FilenameDialog = function(a, b, c, f, p, g, d, e, m, k, h, n) {
    m = null != m ? m : !0;
    var l = document.createElement("table"),
        u = document.createElement("tbody");
    l.style.marginTop = "8px";
    var t = document.createElement("tr");
    var q = document.createElement("td");
    q.style.whiteSpace = "nowrap";
    q.style.fontSize = "10pt";
    q.style.width = h ? "80px" : "120px";
    mxUtils.write(q, (p || mxResources.get("filename")) + ":");
    t.appendChild(q);
    var r = document.createElement("input");
    r.setAttribute("value", b || "");
    r.style.marginLeft = "4px";
    r.style.width = null !=
        n ? n + "px" : "180px";
    var v = mxUtils.button(c, function() {
        if (null == g || g(r.value)) m && a.hideDialog(), f(r.value)
    });
    v.className = "geBtn gePrimaryBtn";
    this.init = function() {
        if (null != p || null == d)
            if (r.focus(), mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? r.select() : document.execCommand("selectAll", !1, null), Graph.fileSupport) {
                var a = l.parentNode;
                if (null != a) {
                    var b = null;
                    mxEvent.addListener(a, "dragleave", function(a) {
                        null != b && (b.style.backgroundColor = "", b = null);
                        a.stopPropagation();
                        a.preventDefault()
                    });
                    mxEvent.addListener(a,
                        "dragover", mxUtils.bind(this, function(a) {
                            null == b && (!mxClient.IS_IE || 10 < document.documentMode) && (b = r, b.style.backgroundColor = "#ebf2f9");
                            a.stopPropagation();
                            a.preventDefault()
                        }));
                    mxEvent.addListener(a, "drop", mxUtils.bind(this, function(a) {
                        null != b && (b.style.backgroundColor = "", b = null);
                        0 <= mxUtils.indexOf(a.dataTransfer.types, "text/uri-list") && (r.value = decodeURIComponent(a.dataTransfer.getData("text/uri-list")), v.click());
                        a.stopPropagation();
                        a.preventDefault()
                    }))
                }
            }
    };
    q = document.createElement("td");
    q.style.whiteSpace =
        "nowrap";
    q.appendChild(r);
    t.appendChild(q);
    if (null != p || null == d) u.appendChild(t), null != h && (null != a.editor.diagramFileTypes && (t = FilenameDialog.createFileTypes(a, r, a.editor.diagramFileTypes), t.style.marginLeft = "6px", t.style.width = "74px", q.appendChild(t), r.style.width = null != n ? n - 40 + "px" : "140px"), q.appendChild(FilenameDialog.createTypeHint(a, r, h)));
    null != d && (t = document.createElement("tr"), q = document.createElement("td"), q.colSpan = 2, q.appendChild(d), t.appendChild(q), u.appendChild(t));
    t = document.createElement("tr");
    q = document.createElement("td");
    q.colSpan = 2;
    q.style.paddingTop = "20px";
    q.style.whiteSpace = "nowrap";
    q.setAttribute("align", "right");
    h = mxUtils.button(mxResources.get("cancel"), function() {
        a.hideDialog();
        null != k && k()
    });
    h.className = "geBtn";
    a.editor.cancelFirst && q.appendChild(h);
    null != e && (n = mxUtils.button(mxResources.get("help"), function() {
        a.editor.graph.openLink(e)
    }), n.className = "geBtn", q.appendChild(n));
    mxEvent.addListener(r, "keypress", function(a) {
        13 == a.keyCode && v.click()
    });
    q.appendChild(v);
    a.editor.cancelFirst ||
        q.appendChild(h);
    t.appendChild(q);
    u.appendChild(t);
    l.appendChild(u);
    this.container = l
};
FilenameDialog.filenameHelpLink = null;
FilenameDialog.createTypeHint = function(a, b, c) {
    var f = document.createElement("img");
    f.style.cssText = "vertical-align:top;height:16px;width:16px;margin-left:4px;background-repeat:no-repeat;background-position:center bottom;cursor:pointer;";
    mxUtils.setOpacity(f, 70);
    var p = function() {
        f.setAttribute("src", Editor.helpImage);
        f.setAttribute("title", mxResources.get("help"));
        for (var a = 0; a < c.length; a++)
            if (0 < c[a].ext.length && b.value.toLowerCase().substring(b.value.length - c[a].ext.length - 1) == "." + c[a].ext) {
                f.setAttribute("src",
                    mxClient.imageBasePath + "/warning.png");
                f.setAttribute("title", mxResources.get(c[a].title));
                break
            }
    };
    mxEvent.addListener(b, "keyup", p);
    mxEvent.addListener(b, "change", p);
    mxEvent.addListener(f, "click", function(b) {
        var d = f.getAttribute("title");
        f.getAttribute("src") == Editor.helpImage ? a.editor.graph.openLink(FilenameDialog.filenameHelpLink) : "" != d && a.showError(null, d, mxResources.get("help"), function() {
            a.editor.graph.openLink(FilenameDialog.filenameHelpLink)
        }, null, mxResources.get("ok"), null, null, null, 340, 90);
        mxEvent.consume(b)
    });
    p();
    return f
};
FilenameDialog.createFileTypes = function(a, b, c) {
    var f = document.createElement("select");
    for (a = 0; a < c.length; a++) {
        var p = document.createElement("option");
        p.setAttribute("value", a);
        mxUtils.write(p, mxResources.get(c[a].description) + " (." + c[a].extension + ")");
        f.appendChild(p)
    }
    mxEvent.addListener(f, "change", function(a) {
        a = c[f.value].extension;
        var d = b.value.lastIndexOf(".");
        0 < d ? (a = c[f.value].extension, b.value = b.value.substring(0, d + 1) + a) : b.value = b.value + "." + a;
        "createEvent" in document ? (a = document.createEvent("HTMLEvents"),
            a.initEvent("change", !1, !0), b.dispatchEvent(a)) : b.fireEvent("onchange")
    });
    a = function(a) {
        var d = b.value.lastIndexOf(".");
        a = 0;
        if (0 < d) {
            d = b.value.toLowerCase().substring(d + 1);
            for (var e = 0; e < c.length; e++)
                if (d == c[e].extension) {
                    a = e;
                    break
                }
        }
        f.value = a
    };
    mxEvent.addListener(b, "change", a);
    mxEvent.addListener(b, "keyup", a);
    a();
    return f
};
(function() {
    mxGraphView.prototype.validateBackgroundPage = function() {
        var a = this.graph;
        if (null != a.container && !a.transparentBackground) {
            if (a.pageVisible) {
                var b = this.getBackgroundPageBounds();
                if (null == this.backgroundPageShape) {
                    for (var c = a.container.firstChild; null != c && c.nodeType != mxConstants.NODETYPE_ELEMENT;) c = c.nextSibling;
                    null != c && (this.backgroundPageShape = this.createBackgroundPageShape(b), this.backgroundPageShape.scale = 1, this.backgroundPageShape.isShadow = !0, this.backgroundPageShape.dialect = mxConstants.DIALECT_STRICTHTML,
                        this.backgroundPageShape.init(a.container), c.style.position = "absolute", a.container.insertBefore(this.backgroundPageShape.node, c), this.backgroundPageShape.redraw(), this.backgroundPageShape.node.className = "geBackgroundPage", mxEvent.addListener(this.backgroundPageShape.node, "dblclick", mxUtils.bind(this, function(d) {
                            a.dblClick(d)
                        })), mxEvent.addGestureListeners(this.backgroundPageShape.node, mxUtils.bind(this, function(d) {
                            a.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(d))
                        }), mxUtils.bind(this, function(d) {
                            null !=
                                a.tooltipHandler && a.tooltipHandler.isHideOnHover() && a.tooltipHandler.hide();
                            a.isMouseDown && !mxEvent.isConsumed(d) && a.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(d))
                        }), mxUtils.bind(this, function(d) {
                            a.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(d))
                        })))
                } else this.backgroundPageShape.scale = 1, this.backgroundPageShape.bounds = b, this.backgroundPageShape.redraw()
            } else null != this.backgroundPageShape && (this.backgroundPageShape.destroy(), this.backgroundPageShape = null);
            this.validateBackgroundStyles()
        }
    };
    mxGraphView.prototype.validateBackgroundStyles = function() {
        var a = this.graph,
            b = null == a.background || a.background == mxConstants.NONE ? a.defaultPageBackgroundColor : a.background,
            c = null != b && this.gridColor != b.toLowerCase() ? this.gridColor : "#ffffff",
            k = "none",
            h = "";
        if (a.isGridEnabled() || a.gridVisible) {
            h = 10;
            mxClient.IS_SVG ? (k = unescape(encodeURIComponent(this.createSvgGrid(c))), k = window.btoa ? btoa(k) : Base64.encode(k, !0), k = "url(data:image/svg+xml;base64," + k + ")", h = a.gridSize * this.scale * this.gridSteps) : k = "url(" + this.gridImage +
                ")";
            var f = c = 0;
            null != a.view.backgroundPageShape && (f = this.getBackgroundPageBounds(), c = 1 + f.x, f = 1 + f.y);
            h = -Math.round(h - mxUtils.mod(this.translate.x * this.scale - c, h)) + "px " + -Math.round(h - mxUtils.mod(this.translate.y * this.scale - f, h)) + "px"
        }
        c = a.view.canvas;
        null != c.ownerSVGElement && (c = c.ownerSVGElement);
        null != a.view.backgroundPageShape ? (a.view.backgroundPageShape.node.style.backgroundPosition = h, a.view.backgroundPageShape.node.style.backgroundImage = k, a.view.backgroundPageShape.node.style.backgroundColor = b, a.view.backgroundPageShape.node.style.borderColor =
            a.defaultPageBorderColor, a.container.className = "geDiagramContainer geDiagramBackdrop", c.style.backgroundImage = "none", c.style.backgroundColor = "") : (a.container.className = "geDiagramContainer", c.style.backgroundPosition = h, c.style.backgroundColor = b, c.style.backgroundImage = k)
    };
    mxGraphView.prototype.createSvgGrid = function(a) {
        for (var b = this.graph.gridSize * this.scale; b < this.minGridSize;) b *= 2;
        for (var d = this.gridSteps * b, c = [], h = 1; h < this.gridSteps; h++) {
            var f = h * b;
            c.push("M 0 " + f + " L " + d + " " + f + " M " + f + " 0 L " + f +
                " " + d)
        }
        return '<svg width="' + d + '" height="' + d + '" xmlns="' + mxConstants.NS_SVG + '"><defs><pattern id="grid" width="' + d + '" height="' + d + '" patternUnits="userSpaceOnUse"><path d="' + c.join(" ") + '" fill="none" stroke="' + a + '" opacity="0.2" stroke-width="1"/><path d="M ' + d + " 0 L 0 0 0 " + d + '" fill="none" stroke="' + a + '" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>'
    };
    var a = mxGraph.prototype.panGraph;
    mxGraph.prototype.panGraph = function(b, c) {
        a.apply(this, arguments);
        if (null != this.shiftPreview1) {
            var d = this.view.canvas;
            null != d.ownerSVGElement && (d = d.ownerSVGElement);
            var e = this.gridSize * this.view.scale * this.view.gridSteps;
            e = -Math.round(e - mxUtils.mod(this.view.translate.x * this.view.scale + b, e)) + "px " + -Math.round(e - mxUtils.mod(this.view.translate.y * this.view.scale + c, e)) + "px";
            d.style.backgroundPosition = e
        }
    };
    mxGraph.prototype.updatePageBreaks = function(a, b, c) {
        var d = this.view.scale,
            e = this.view.translate,
            f = this.pageFormat,
            m = d * this.pageScale,
            g = this.view.getBackgroundPageBounds();
        b = g.width;
        c = g.height;
        var p = new mxRectangle(d * e.x, d * e.y, f.width * m, f.height * m),
            q = (a = a && Math.min(p.width, p.height) > this.minPageBreakDist) ? Math.ceil(c / p.height) - 1 : 0,
            r = a ? Math.ceil(b / p.width) - 1 : 0,
            v = g.x + b,
            w = g.y + c;
        null == this.horizontalPageBreaks && 0 < q && (this.horizontalPageBreaks = []);
        null == this.verticalPageBreaks && 0 < r && (this.verticalPageBreaks = []);
        a = mxUtils.bind(this, function(a) {
            if (null != a) {
                for (var b = a == this.horizontalPageBreaks ? q : r, d = 0; d <= b; d++) {
                    var c = a == this.horizontalPageBreaks ? [new mxPoint(Math.round(g.x),
                        Math.round(g.y + (d + 1) * p.height)), new mxPoint(Math.round(v), Math.round(g.y + (d + 1) * p.height))] : [new mxPoint(Math.round(g.x + (d + 1) * p.width), Math.round(g.y)), new mxPoint(Math.round(g.x + (d + 1) * p.width), Math.round(w))];
                    null != a[d] ? (a[d].points = c, a[d].redraw()) : (c = new mxPolyline(c, this.pageBreakColor), c.dialect = this.dialect, c.isDashed = this.pageBreakDashed, c.pointerEvents = !1, c.init(this.view.backgroundPane), c.redraw(), a[d] = c)
                }
                for (d = b; d < a.length; d++) a[d].destroy();
                a.splice(b, a.length - b)
            }
        });
        a(this.horizontalPageBreaks);
        a(this.verticalPageBreaks)
    };
    var b = mxGraphHandler.prototype.shouldRemoveCellsFromParent;
    mxGraphHandler.prototype.shouldRemoveCellsFromParent = function(a, c, f) {
        for (var d = 0; d < c.length; d++) {
            if (this.graph.isTableCell(c[d]) || this.graph.isTableRow(c[d])) return !1;
            if (this.graph.getModel().isVertex(c[d])) {
                var e = this.graph.getCellGeometry(c[d]);
                if (null != e && e.relative) return !1
            }
        }
        return b.apply(this, arguments)
    };
    var c = mxConnectionHandler.prototype.createMarker;
    mxConnectionHandler.prototype.createMarker = function() {
        var a =
            c.apply(this, arguments);
        a.intersects = mxUtils.bind(this, function(d, b) {
            return this.isConnecting() ? !0 : mxCellMarker.prototype.intersects.apply(a, arguments)
        });
        return a
    };
    mxGraphView.prototype.createBackgroundPageShape = function(a) {
        return new mxRectangleShape(a, "#ffffff", this.graph.defaultPageBorderColor)
    };
    mxGraphView.prototype.getBackgroundPageBounds = function() {
        var a = this.getGraphBounds(),
            b = 0 < a.width ? a.x / this.scale - this.translate.x : 0,
            c = 0 < a.height ? a.y / this.scale - this.translate.y : 0,
            f = this.graph.pageFormat,
            h = this.graph.pageScale,
            g = f.width * h;
        f = f.height * h;
        h = Math.floor(Math.min(0, b) / g);
        var l = Math.floor(Math.min(0, c) / f);
        return new mxRectangle(this.scale * (this.translate.x + h * g), this.scale * (this.translate.y + l * f), this.scale * (Math.ceil(Math.max(1, b + a.width / this.scale) / g) - h) * g, this.scale * (Math.ceil(Math.max(1, c + a.height / this.scale) / f) - l) * f)
    };
    var f = mxGraph.prototype.panGraph;
    mxGraph.prototype.panGraph = function(a, b) {
        f.apply(this, arguments);
        this.dialect == mxConstants.DIALECT_SVG || null == this.view.backgroundPageShape ||
            this.useScrollbarsForPanning && mxUtils.hasScrollbars(this.container) || (this.view.backgroundPageShape.node.style.marginLeft = a + "px", this.view.backgroundPageShape.node.style.marginTop = b + "px")
    };
    var p = mxPopupMenu.prototype.addItem;
    mxPopupMenu.prototype.addItem = function(a, b, c, f, g, n) {
        var d = p.apply(this, arguments);
        null == n || n || mxEvent.addListener(d, "mousedown", function(a) {
            mxEvent.consume(a)
        });
        return d
    };
    var g = mxGraphHandler.prototype.isPropagateSelectionCell;
    mxGraphHandler.prototype.isPropagateSelectionCell =
        function(a, b, c) {
            var d = this.graph.model.getParent(a);
            if (b) {
                var e = this.graph.model.isEdge(a) ? null : this.graph.getCellGeometry(a);
                e = !this.graph.model.isEdge(d) && !this.graph.isSiblingSelected(a) && (null != e && e.relative || !this.graph.isContainer(d) || this.graph.isPart(a))
            } else if (e = g.apply(this, arguments), this.graph.isTableCell(a) || this.graph.isTableRow(a)) e = d, this.graph.isTable(e) || (e = this.graph.model.getParent(e)), e = !this.graph.selectionCellsHandler.isHandled(e) || this.graph.isCellSelected(e) && this.graph.isToggleEvent(c.getEvent()) ||
                this.graph.isCellSelected(a) && !this.graph.isToggleEvent(c.getEvent()) || this.graph.isTableCell(a) && this.graph.isCellSelected(d);
            return e
        };
    mxPopupMenuHandler.prototype.getCellForPopupEvent = function(a) {
        a = a.getCell();
        for (var b = this.graph.getModel(), c = b.getParent(a), d = this.graph.view.getState(c), f = this.graph.isCellSelected(a); null != d && (b.isVertex(c) || b.isEdge(c));) {
            var g = this.graph.isCellSelected(c);
            f = f || g;
            if (g || !f && (this.graph.isTableCell(a) || this.graph.isTableRow(a))) a = c;
            c = b.getParent(c)
        }
        return a
    }
})();