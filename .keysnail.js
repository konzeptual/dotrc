// ========================== KeySnail Init File =========================== //

// You can preserve your code in this area when generating the init file using GUI.
// Put all your code except special key, set*key, hook, blacklist.
// ========================================================================= //
//{{%PRESERVE%
// Put your codes here

let table = {
    "q": "й",
    "w": "ц",
    "e": "у",
    "r": "к",
    "t": "е",
    "y": "н",
    "u": "г",
    "i": "ш",
    "o": "щ",
    "p": "з",
    "[": "х",
    "]": "ъ",
    "a": "ф",
    "s": "ы",
    "d": "в",
    "f": "а",
    "g": "п",
    "h": "р",
    "j": "о",
    "k": "л",
    "l": "д",
    ";": "ж",
    "'": "э",
    "z": "я",
    "x": "ч",
    "c": "с",
    "v": "м",
    "b": "и",
    "n": "т",
    "m": "ь",
    ",": "б",
    ".": "ю",
    "/": "."
};

key.isDisplayableKey = function (ev) {
    return ev.charCode !== 0;
};

function replacer(keymap) {
    for (let [k, f] in Iterator(keymap))
    {
        if (typeof keymap[k] === "object")
            replacer(keymap[k]);

        if (/^(C-|M-)/.test(k))
            continue;

        if (((k <= 'z' && k >= 'a') || (k <= 'Z' && k >= 'A')) && table[k])
        {
            keymap[table[k]] = keymap[k];
        }
    }
}

for (let [mode, keymap] in Iterator(key.keyMapHolder))
{
    if (!keymap)
        continue;

    replacer(keymap);
}


// ========================= K2Emacs plugin ========================== //
plugins.options["K2Emacs.editor"]    = "/usr/bin/emacsclient";
plugins.options["K2Emacs.ext"]    = "html";
plugins.options["K2Emacs.encode"] = "UTF-8"
plugins.options["K2Emacs.sep"] = "\\";

//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "C-g";
key.helpKey              = "<f1>";
key.escapeKey            = "C-q";
key.macroStartKey        = "<f3>";
key.macroEndKey          = "<f4>";
key.universalArgumentKey = "C-u";
key.negativeArgument1Key = "C--";
key.negativeArgument2Key = "C-M--";
key.negativeArgument3Key = "M--";
key.suspendKey           = "<f2>";

// ================================= Hooks ================================= //

hook.setHook('KeyBoardQuit', function (aEvent) {
    if (key.currentKeySequence.length) {
        return;
    }
    command.closeFindBar();
    if (util.isCaretEnabled()) {
        command.resetMark(aEvent);
    } else {
        goDoCommand("cmd_selectNone");
    }
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
});


// ============================= Key bindings ============================== //

key.setGlobalKey('C-M-r', function () {
    userscript.reload();
}, 'Reload the initialization file', true);

key.setGlobalKey('M-x', function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one', true);

key.setGlobalKey('M-:', function () {
    command.interpreter();
}, 'Command interpreter', true);

key.setGlobalKey(['<f1>', 'b'], function () {
    key.listKeyBindings();
}, 'List all keybindings');

key.setGlobalKey(['<f1>', 'F'], function (ev) {
    openHelpLink("firefox-help");
}, 'Display Firefox help');

key.setGlobalKey('C-m', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_RETURN, true);
}, 'Generate the return key code');

key.setGlobalKey('C-j', function (aEvent, arg) {
    command.bookMarkToolBarJumpTo(aEvent, arg);
}, 'Open the bookmark toolbar item', true);

key.setGlobalKey(['C-x', 'l'], function () {
    command.focusToById("urlbar");
}, 'Focus to the location bar');

// key.setGlobalKey(['C-x', 'д'], function () {
//     command.focusToById("urlbar");
// }, 'Focus to the location bar');

key.setGlobalKey(['C-x', 'g'], function () {
    command.focusToById("searchbar");
}, 'Focus to the search bar', true);

key.setGlobalKey(['C-x', 't'], function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setGlobalKey(['C-x', 's'], function () {
    command.focusElement(command.elementsRetrieverButton, 0);
}, 'Focus to the first button', true);

key.setGlobalKey(['C-x', 'k'], function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-w", true));
}, 'Close tab / window');

key.setGlobalKey(['C-x', 'K'], function () {
    closeWindow(true);
}, 'Close the window');

key.setGlobalKey(['C-x', 'n'], function (ev) {
    OpenBrowserWindow();
}, 'Open new window');

key.setGlobalKey(['C-x', 'C-c'], function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-q", true));
}, 'Exit Firefox', true);

key.setGlobalKey(['C-x', 'o'], function (aEvent, aArg) {
    command.focusOtherFrame(aArg);
}, 'Select next frame');

key.setGlobalKey(['C-x', '1'], function (aEvent) {
    window.loadURI(aEvent.target.ownerDocument.location.href);
}, 'Show current frame only', true);

key.setGlobalKey(['C-x', 'C-f'], function () {
    BrowserOpenFileWindow();
}, 'Open the local file', true);

key.setGlobalKey(['C-x', 'C-s'], function () {
    saveDocument(window.content.document);
}, 'Save current page to the file', true);

key.setGlobalKey('M-w', function (aEvent) {
    command.copyRegion(aEvent);
}, 'Copy selected text', true);

key.setGlobalKey('C-s', function (ev) {
    command.iSearchForwardKs(ev);
}, 'Emacs like incremental search forward', true);

key.setGlobalKey('C-r', function (ev) {
    command.iSearchBackwardKs(ev);
}, 'Emacs like incremental search backward', true);

key.setGlobalKey(['C-c', 'u'], function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-T", true));
}, 'Undo closed tab');

key.setGlobalKey(['C-c', 'C-c', 'C-v'], function () {
    toJavaScriptConsole();
}, 'Display JavaScript console', true);

key.setGlobalKey(['C-c', 'C-c', 'C-c'], function () {
    command.clearConsole();
}, 'Clear Javascript console', true);

key.setGlobalKey('C-M-l', function () {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab');

key.setGlobalKey('C-M-h', function () {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab');

key.setViewKey([['C-n'], ['j']], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, 'Scroll line down');

key.setViewKey([['C-p'], ['k']], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
}, 'Scroll line up');

key.setViewKey([['C-f'], ['.']], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, 'Scroll left');

key.setViewKey([['C-b'], [',']], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, 'Scroll right');

key.setViewKey([['M-v'], ['b']], function () {
    goDoCommand("cmd_scrollPageUp");
}, 'Scroll page up');

key.setViewKey('C-v', function () {
    goDoCommand("cmd_scrollPageDown");
}, 'Scroll page down');

key.setViewKey([['M-<'], ['g']], function () {
    goDoCommand("cmd_scrollTop");
}, 'Scroll to the top of the page', true);

key.setViewKey([['M->'], ['G']], function () {
    goDoCommand("cmd_scrollBottom");
}, 'Scroll to the bottom of the page', true);

key.setViewKey('l', function () {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab');

key.setViewKey('h', function () {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab');

key.setViewKey('R', function () {
    BrowserReload();
}, 'Reload the page', true);

key.setViewKey('B', function () {
    BrowserBack();
}, 'Back');

key.setViewKey('F', function () {
    BrowserForward();
}, 'Forward');

key.setViewKey(['C-x', 'h'], function () {
    goDoCommand("cmd_selectAll");
}, 'Select all', true);

key.setViewKey('f', function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setViewKey('M-p', function () {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, 'Focus to the next button');

key.setViewKey('M-n', function () {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, 'Focus to the previous button');

key.setViewKey([':', 'b'], function (ev, arg) {
    ext.exec("bmany-list-all-bookmarks", arg, ev);
}, 'bmany - List all bookmarks');

key.setViewKey([':', 'B'], function (ev, arg) {
    ext.exec("bmany-list-bookmarklets", arg, ev);
}, 'bmany - List all bookmarklets');

key.setViewKey([':', 'k'], function (ev, arg) {
    ext.exec("bmany-list-bookmarks-with-keyword", arg, ev);
}, 'bmany - List bookmarks with keyword');

key.setViewKey('e', function (aEvent, aArg) {
    ext.exec("hok-start-foreground-mode", aArg);
}, 'Hok - Foreground hint mode', true);

key.setViewKey('E', function (aEvent, aArg) {
    ext.exec("hok-start-background-mode", aArg);
}, 'HoK - Background hint mode', true);

key.setViewKey(';', function (aEvent, aArg) {
    ext.exec("hok-start-extended-mode", aArg);
}, 'HoK - Extented hint mode', true);

key.setViewKey(['C-c', 'C-e'], function (aEvent, aArg) {
    ext.exec("hok-start-continuous-mode", aArg);
}, 'Start continuous HaH', true);

key.setEditKey(['C-x', 'h'], function (aEvent) {
    command.selectAll(aEvent);
}, 'Select whole text', true);

key.setEditKey([['C-x', 'u'], ['C-_']], function () {
    display.echoStatusBar("Undo!", 2000);
    goDoCommand("cmd_undo");
}, 'Undo');

key.setEditKey(['C-x', 'r', 'd'], function (aEvent, aArg) {
    command.replaceRectangle(aEvent.originalTarget, "", false, !aArg);
}, 'Delete text in the region-rectangle', true);

key.setEditKey(['C-x', 'r', 't'], function (aEvent) {
    prompt.read("String rectangle: ", function (aStr, aInput) {
        command.replaceRectangle(aInput, aStr);
    },
    aEvent.originalTarget);
}, 'Replace text in the region-rectangle with user inputted string', true);

key.setEditKey(['C-x', 'r', 'o'], function (aEvent) {
    command.openRectangle(aEvent.originalTarget);
}, 'Blank out the region-rectangle, shifting text right', true);

key.setEditKey(['C-x', 'r', 'k'], function (aEvent, aArg) {
    command.kill.buffer = command.killRectangle(aEvent.originalTarget, !aArg);
}, 'Delete the region-rectangle and save it as the last killed one', true);

key.setEditKey(['C-x', 'r', 'y'], function (aEvent) {
    command.yankRectangle(aEvent.originalTarget, command.kill.buffer);
}, 'Yank the last killed rectangle with upper left corner at point', true);

key.setEditKey([['C-SPC'], ['C-@']], function (aEvent) {
    command.setMark(aEvent);
}, 'Set the mark', true);

key.setEditKey('C-o', function (aEvent) {
    command.openLine(aEvent);
}, 'Open line');

key.setEditKey('C-\\', function () {
    display.echoStatusBar("Redo!", 2000);
    goDoCommand("cmd_redo");
}, 'Redo');

key.setEditKey('C-a', function (aEvent) {
    command.beginLine(aEvent);
}, 'Beginning of the line');

key.setEditKey('C-e', function (aEvent) {
    command.endLine(aEvent);
}, 'End of the line');

key.setEditKey('C-f', function (aEvent) {
    command.nextChar(aEvent);
}, 'Forward char');

key.setEditKey('C-b', function (aEvent) {
    command.previousChar(aEvent);
}, 'Backward char');

key.setEditKey('M-f', function (aEvent) {
    command.forwardWord(aEvent);
}, 'Next word');

key.setEditKey('M-b', function (aEvent) {
    command.backwardWord(aEvent);
}, 'Previous word');

key.setEditKey('C-n', function (aEvent) {
    command.nextLine(aEvent);
}, 'Next line');

key.setEditKey('C-p', function (aEvent) {
    command.previousLine(aEvent);
}, 'Previous line');

key.setEditKey('C-v', function (aEvent) {
    command.pageDown(aEvent);
}, 'Page down');

key.setEditKey('M-v', function (aEvent) {
    command.pageUp(aEvent);
}, 'Page up');

key.setEditKey('M-<', function (aEvent) {
    command.moveTop(aEvent);
}, 'Beginning of the text area');

key.setEditKey('M->', function (aEvent) {
    command.moveBottom(aEvent);
}, 'End of the text area');

key.setEditKey('C-d', function () {
    goDoCommand("cmd_deleteCharForward");
}, 'Delete forward char');

key.setEditKey('C-h', function () {
    goDoCommand("cmd_deleteCharBackward");
}, 'Delete backward char');

key.setEditKey('M-d', function () {
    command.deleteForwardWord(ev);
}, 'Delete forward word');

key.setEditKey([['C-<backspace>'], ['M-<delete>']], function (ev) {
    command.deleteBackwardWord(ev);
}, 'Delete backward word');

key.setEditKey('M-u', function (ev, arg) {
    command.wordCommand(ev, arg, command.upcaseForwardWord, command.upcaseBackwardWord);
}, 'Convert following word to upper case');

key.setEditKey('M-l', function (ev, arg) {
    command.wordCommand(ev, arg, command.downcaseForwardWord, command.downcaseBackwardWord);
}, 'Convert following word to lower case');

key.setEditKey('M-c', function (ev, arg) {
    command.wordCommand(ev, arg, command.capitalizeForwardWord, command.capitalizeBackwardWord);
}, 'Capitalize the following word');

key.setEditKey('C-k', function (aEvent) {
    command.killLine(aEvent);
}, 'Kill the rest of the line');

key.setEditKey('C-y', command.yank, 'Paste (Yank)');

key.setEditKey('M-y', command.yankPop, 'Paste pop (Yank pop)', true);

key.setEditKey('C-M-y', function (aEvent) {
    if (!command.kill.ring.length) {
        return;
    }
    let(ct = command.getClipboardText())(!command.kill.ring.length || ct != command.kill.ring[0]) && command.pushKillRing(ct);
    prompt.selector({
        message: "Paste:",
        collection: command.kill.ring,
        callback: function (i) {
            if (i >= 0) {
                key.insertText(command.kill.ring[i]);
            }
        }
    });
}, 'Show kill-ring and select text to paste', true);

key.setEditKey('C-w', function (aEvent) {
    goDoCommand("cmd_copy");
    goDoCommand("cmd_delete");
    command.resetMark(aEvent);
}, 'Cut current region', true);

key.setEditKey('M-n', function () {
    command.walkInputElement(command.elementsRetrieverTextarea, true, true);
}, 'Focus to the next text area');

key.setEditKey('M-p', function () {
    command.walkInputElement(command.elementsRetrieverTextarea, false, true);
}, 'Focus to the previous text area');

key.setEditKey(['C-c', 'e'], function (ev, arg) {
    ext.exec("edit_text", arg);
}, '外部エディタで編集', true);

key.setCaretKey([['C-a'], ['^']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
}, 'Move caret to the beginning of the line');

key.setCaretKey([['C-e'], ['$'], ['M->'], ['G']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'Move caret to the end of the line');

key.setCaretKey([['C-n'], ['j']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
}, 'Move caret to the next line');

key.setCaretKey([['C-p'], ['k']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
}, 'Move caret to the previous line');

key.setCaretKey([['C-f'], ['l']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'Move caret to the right');

key.setCaretKey([['C-b'], ['h'], ['C-h']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'Move caret to the left');

key.setCaretKey([['M-f'], ['w']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'Move caret to the right by word');

key.setCaretKey([['M-b'], ['W']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'Move caret to the left by word');

key.setCaretKey([['C-v'], ['SPC']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'Move caret down by page');

key.setCaretKey([['M-v'], ['b']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
}, 'Move caret up by page');

key.setCaretKey([['M-<'], ['g']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
}, 'Move caret to the top of the page');

key.setCaretKey('J', function () {
    util.getSelectionController().scrollLine(true);
}, 'Scroll line down');

key.setCaretKey('K', function () {
    util.getSelectionController().scrollLine(false);
}, 'Scroll line up');

key.setCaretKey(',', function () {
    util.getSelectionController().scrollHorizontal(true);
    goDoCommand("cmd_scrollLeft");
}, 'Scroll left');

key.setCaretKey('.', function () {
    goDoCommand("cmd_scrollRight");
    util.getSelectionController().scrollHorizontal(false);
}, 'Scroll right');

key.setCaretKey('z', function (aEvent) {
    command.recenter(aEvent);
}, 'Scroll to the cursor position');

key.setCaretKey([['C-SPC'], ['C-@']], function (aEvent) {
    command.setMark(aEvent);
}, 'Set the mark', true);

key.setCaretKey('R', function () {
    BrowserReload();
}, 'Reload the page', true);

key.setCaretKey('B', function () {
    BrowserBack();
}, 'Back');

key.setCaretKey('F', function () {
    BrowserForward();
}, 'Forward');

key.setCaretKey(['C-x', 'h'], function () {
    goDoCommand("cmd_selectAll");
}, 'Select all', true);

key.setCaretKey('f', function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setCaretKey('M-p', function () {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, 'Focus to the next button');

key.setCaretKey('M-n', function () {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, 'Focus to the previous button');

