"use strict";
// Type
// ====
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.hvm_debug = void 0;
var utils_1 = require("../../utils");
// Monad
// =====
// Monadic binder
function bind(a_parser, b_parser) {
    return function (state) {
        var _a = a_parser(state), state = _a[0], a_value = _a[1];
        return b_parser(a_value)(state);
    };
}
// Monadic return
function pure(a) {
    return function (state) {
        return [state, a];
    };
}
// This kinda works but lowers the IQ of TypeScript's type checker by 87%
function Parser(fn) {
    var gen = fn();
    return function (state) {
        var next = gen.next();
        while (!next.done) {
            var _a = next.value(state), state = _a[0], value = _a[1];
            next = gen.next(value);
        }
        return pure(next.value)(state);
    };
}
function run(a) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, a];
            case 1: return [2 /*return*/, (_a.sent())];
        }
    });
}
// Utils
// =====
// Returns the current state
var get_state = function (state) {
    return [state, state];
};
// Applies a parser to some come
function read(parser, code) {
    var _a = parser()({ code: code, index: 0 }), state = _a[0], value = _a[1];
    return value;
}
// Skippers
// ========
// Skips "//..." comments
var skip_comment = function (state) {
    var state = __assign({}, state);
    var skips = state.code.slice(state.index, state.index + 2) === "//";
    if (skips) {
        state.index += 2;
        while (state.index < state.code.length &&
            !/\n/.test(state.code[state.index])) {
            state.index += 1;
        }
    }
    return [state, skips];
};
// Skips whitespaces
var skip_spaces = function (state) {
    var state = __assign({}, state);
    var skips = /\s/.test(state.code[state.index]);
    while (/\s/.test(state.code[state.index])) {
        state.index += 1;
    }
    return [state, skips];
};
// Skips whitespaces and comments
var skip = function (state) {
    var _a = skip_comment(state), state = _a[0], comment = _a[1];
    var _b = skip_spaces(state), state = _b[0], spaces = _b[1];
    if (comment || spaces) {
        var _c = skip(state), state = _c[0], skipped = _c[1];
        return [state, true];
    }
    else {
        return [state, false];
    }
};
// Strings
// =======
// Attempts to match a string right after the cursor.
// If it matches, consume it and return true.
// Otherwise, return false.
function match_here(str) {
    return function (state) {
        if (state.code.slice(state.index, state.index + str.length) === str) {
            return [__assign(__assign({}, state), { index: state.index + str.length }), true];
        }
        else {
            return [state, false];
        }
    };
}
// Attempts to match a string right after the cursor.
// If it matches, consume it and return true.
// Otherwise, return false.
function match_here_regex(regex) {
    return function (state) {
        var matched = state.code.slice(state.index).match(regex);
        if (matched && matched.index === 0) {
            return [__assign(__assign({}, state), { index: state.index + matched[0].length }), true];
        }
        else {
            return [state, false];
        }
    };
}
// Like match, but skipping spaces and comments before.
function match(matcher) {
    return function (state) {
        var _a = skip(state), state = _a[0], skipped = _a[1];
        if (typeof matcher === "string") {
            return match_here(matcher)(state);
        }
        else {
            return match_here_regex(matcher)(state);
        }
    };
}
// Forces consuming a string. If it fails, throws.
function consume(str) {
    return function (state) {
        var _a = match(str)(state), state = _a[0], matched = _a[1];
        if (matched) {
            return [state, null];
        }
        else {
            var fail = expected_string(str);
            return fail(state);
        }
    };
}
// Consumes one character. Returns it.
function get_char() {
    return function (state) {
        var _a = skip(state), state = _a[0], skipped = _a[1];
        if (state.index < state.code.length) {
            return [__assign(__assign({}, state), { index: state.index + 1 }), state.code[state.index]];
        }
        else {
            return [state, null];
        }
    };
}
// Returns true if we are at the end of the file, skipping spaces and comments.
var done = function (state) {
    var _a = skip(state), state = _a[0], skipped = _a[1];
    return [state, state.index === state.code.length];
};
// Blocks
// ======
// Checks if a boolean parser returns true. If so, revert it and apply another
// parser. This is usually used to select parsing variants.
function guard(head, body) {
    return function (state) {
        var _a = skip(state), state = _a[0], skipped = _a[1];
        var _b = dry(head)(state), state = _b[0], matched = _b[1];
        if (matched) {
            return body(state);
        }
        else {
            return [state, null];
        }
    };
}
// Attempts several `A | null` parsers, returning the first one that succeeds.
// If no parser succeeds, throws.
function grammar(name, choices) {
    return function (state) {
        for (var i = 0; i < choices.length; ++i) {
            var _a = choices[i](state), state = _a[0], got = _a[1];
            if (got) {
                return [state, got];
            }
        }
        var fail = expected_type(name);
        return fail(state);
    };
}
// Combinators
// ===========
// Evaluates a parser and returns its result, but reverts its effect.
function dry(parser) {
    return function (state) {
        var _a = parser(state), _ = _a[0], result = _a[1];
        return [state, result];
    };
}
// Evaluates a parser until a condition is met. Returns an array of results.
function until(delim, parser) {
    return function (state) {
        var _a = delim(state), state = _a[0], delimited = _a[1];
        if (delimited) {
            return [state, []];
        }
        else {
            var _b = parser(state), state = _b[0], a = _b[1];
            var _c = until(delim, parser)(state), state = _c[0], b = _c[1];
            return [state, [a].concat(b)];
        }
    };
}
// Evaluates a list-like parser, with an opener, separator, and closer.
function list(open, sep, close, elem, make) {
    return function (state) {
        var _a = open(state), state = _a[0], skp = _a[1];
        var _b = until(close, function (state) {
            var _a = elem(state), state = _a[0], val = _a[1];
            var _b = sep(state), state = _b[0], skp = _b[1];
            return [state, val];
        })(state), state = _b[0], arr = _b[1];
        return [state, make(arr)];
    };
}
function caller(open) {
    return function (state) {
        var _a = name_here(state), state = _a[0], nam = _a[1];
        var _b = match_here(open)(state), state = _b[0], got = _b[1];
        return [state, nam.length > 0 && got];
    };
}
function call(open, sep, close, elem, make) {
    return function (state) {
        var _a = name1(state), state = _a[0], nam = _a[1];
        var _b = open(state), state = _b[0], skp = _b[1];
        var _c = until(close, function (state) {
            var _a = elem(state), state = _a[0], val = _a[1];
            var _b = sep(state), state = _b[0], skp = _b[1];
            return [state, val];
        })(state), state = _c[0], arr = _c[1];
        return [state, make(nam, arr)];
    };
}
// Name
// ====
// Parses a name right after the parsing cursor.
var name_here = function (state) {
    var state = __assign({}, state);
    var name = "";
    while (state.index < state.code.length &&
        /[a-zA-Z0-9_.]|[\+|\-|\*|\/|\%|\&|\||\^|\<|\>|\=|\!]/.test(state.code[state.index])) {
        name += state.code[state.index];
        state.index += 1;
    }
    return [state, name];
};
// Parses a name after skipping.
var name0 = function (state) {
    var _a = skip(state), state = _a[0], skipped = _a[1];
    return name_here(state);
};
// Parses a non-empty name after skipping.
var name1 = function (state) {
    var _a = name0(state), state = _a[0], name1 = _a[1];
    if (name1.length > 0) {
        return [state, name1];
    }
    else {
        var fail = expected_type("name");
        return fail(state);
    }
};
// Errors
// ======
function expected_string(str) {
    return function (state) {
        throw ("Expected '" +
            str +
            "':\n" +
            highlight(state.index, state.index + str.length, state.code));
    };
}
function expected_type(name) {
    return function (state) {
        throw ("Expected " +
            name +
            ":\n" +
            highlight(state.index, state.index + 1, state.code));
    };
}
// Pretty highligts a slice of the code, between two given indexes.
function highlight(from_index, to_index, code) {
    var open = "«";
    var close = "»";
    var open_color = "\x1b[4m\x1b[31m";
    var close_color = "\x1b[0m";
    var from_line = 0;
    var to_line = 0;
    for (var i = 0; i < from_index; ++i) {
        if (code[i] === "\n")
            ++from_line;
    }
    for (var i = 0; i < to_index; ++i) {
        if (code[i] === "\n")
            ++to_line;
    }
    var colored = code.slice(0, from_index) +
        open +
        code.slice(from_index, to_index) +
        close +
        code.slice(to_index);
    var lines = colored.split("\n");
    var block_from_line = Math.max(from_line - 3, 0);
    var block_to_line = Math.min(to_line + 3, lines.length);
    var lines = lines.slice(block_from_line, block_to_line);
    var text = "";
    for (var i = 0; i < lines.length; ++i) {
        var numb = block_from_line + i;
        var line = lines[i] + "\n";
        if (numb === from_line && numb === to_line) {
            line =
                line.slice(0, line.indexOf(open)) +
                    open_color +
                    line.slice(line.indexOf(open), line.indexOf(close) + 1) +
                    close_color +
                    line.slice(line.indexOf(close) + 1);
        }
        else if (numb === from_line) {
            line =
                line.slice(0, line.indexOf(open)) +
                    open_color +
                    line.slice(line.indexOf(open)) +
                    close_color;
        }
        else if (numb > from_line && numb < to_line) {
            line = open_color + line + close_color;
        }
        else if (numb === to_line) {
            line =
                open_color +
                    line.slice(0, line.indexOf(close) + 1) +
                    close_color +
                    line.slice(line.indexOf(close) + 1);
        }
        line = ("    " + numb).slice(-4) + " | " + line;
        text += line;
    }
    return text;
}
var sbt = function (state) {
    var sbt_node = guard(match("("), Parser(function () {
        var lft, rgt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(run(consume("(")))];
                case 1:
                    _a.sent();
                    return [5 /*yield**/, __values(run(sbt))];
                case 2:
                    lft = _a.sent();
                    return [5 /*yield**/, __values(run(sbt))];
                case 3:
                    rgt = _a.sent();
                    return [5 /*yield**/, __values(run(consume(")")))];
                case 4:
                    _a.sent();
                    return [2 /*return*/, [lft, rgt]];
            }
        });
    }));
    var sbt_name = guard(match(""), Parser(function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(run(name0))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }));
    return grammar("StrBinTree", [sbt_node, sbt_name])(state);
};
var hvm_debug_parser = function (state) {
    // parses a node (Ctr or App/Cal)
    var term_node = guard(match("("), function (state) {
        var _a = consume("(")(state), state1 = _a[0], _ = _a[1];
        var _b = term(state1), state2 = _b[0], parent = _b[1];
        var _c = until(match(")"), term)(state2), state3 = _c[0], children = _c[1];
        return [state3, { parent: parent, children: children, type: "Node" }];
    });
    // parses a lambda
    var term_lam = guard(match("λ"), function (state) {
        var _a = consume("λ")(state), state1 = _a[0], _ = _a[1];
        var _b = name1(state1), state2 = _b[0], name = _b[1];
        var _c = term(state2), state3 = _c[0], body = _c[1];
        return [state3, { name: name, body: body, type: "Lam" }];
    });
    // parses a name (Ctr names, Ope symbols, numbers, etc)
    var term_name = function (state) {
        var _a = name1(state), new_state = _a[0], name = _a[1];
        var first_letter = name.charAt(0);
        // if starts with a number
        if (first_letter >= "0" && first_letter <= "0") {
            // return a number term
            return [new_state, { name: name, type: "Number" }];
        }
        // if starts with a capital letter or its a symbol
        else if (first_letter.toUpperCase() == first_letter) {
            // return it just as a name (for Ctr, App, Cal, Ope, etc)
            return [new_state, { name: name, type: "Name" }];
        }
        else {
            // else return as a variable
            return [new_state, { name: { name: name, type: "Name" }, type: "Var" }];
        }
    };
    var term_sup = guard(match("{"), function (state) {
        var state1 = match("{")(state)[0];
        var _a = term(state1), state2 = _a[0], term1 = _a[1];
        var _b = term(state2), state3 = _b[0], term2 = _b[1];
        var state4 = match("}")(state3)[0];
        return [state4, { term1: term1, term2: term2, type: "Sup" }];
    });
    var term = function (state) {
        var _a = match("$")(state), state1 = _a[0], here = _a[1];
        var _b = grammar("DebugTerm", [
            term_node,
            term_lam,
            term_sup,
            term_name,
        ])(state1), state2 = _b[0], term = _b[1];
        return [state2, { here: here, term: term }];
    };
    var dup = guard(match("dup"), function (state) {
        var state1 = match("dup")(state)[0];
        var _a = term(state1), state2 = _a[0], name1 = _a[1];
        var _b = term(state2), state3 = _b[0], name2 = _b[1];
        var state4 = match("=")(state3)[0];
        var _c = term(state4), state5 = _c[0], dup_term = _c[1];
        var state6 = match(";")(state5)[0];
        return [state6, { name1: name1, name2: name2, term: dup_term, type: "Dup" }];
    });
    var hvm = until(match("\0"), grammar("HVMDebug", [dup, term]));
    return hvm(state);
};
function sbt_test() {
    var code = "(this ((is surely) (((a proper) string) (binary tree))))";
    console.log(JSON.stringify(sbt({ code: code, index: 0 })));
}
function hvm_debug_parser_test() {
    var code = "(($\u03BBx0 a1 a3) (Fold (Concat a4 (Cons b3 b4)) \u03BBx5 b1 0))\n  dup a1 b1 = \u03BBx2 (+ {x0 x5} x2);\n  dup a3 b3 = 0;\n  dup a4 b4 = (Cons 1 (Cons 2 (Cons 3 (Cons 4 (Nil)))));\0";
    console.log(JSON.stringify(hvm_debug_parser({ code: code, index: 0 })[1], null, 2));
}
// hvm_debug_parser_test();
//console.log(sbt_test());
// UTILS
// =========
var sep = "------------------------\n";
function sanitize(code) {
    code = code.replace(sep, "");
    code = code.replace(/Rewrites(.*)$/, "");
    code = code.replace(/Mem.Size(.*)$/, sep);
    return code;
}
function divide(code) {
    return code.split(sep).map(function (str) { return str + "\0"; });
}
// export
exports.hvm_debug = (0, utils_1.compose)(function (arr) { return arr.map(function (code) { return hvm_debug_parser({ code: code, index: 0 })[1]; }); }, divide, sanitize);
