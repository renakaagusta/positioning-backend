"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function connector() {
    return __awaiter(this, void 0, void 0, function* () {
        yield graph.addVertex('0', {
            '2': yield weight(data.features[0].geometry["coordinates"], data.features[1].geometry["coordinates"], "0", "2"),
        });
        yield graph.addVertex('1', {
            '7': yield weight(data.features[1].geometry["coordinates"], data.features[7].geometry["coordinates"], "1", "7"),
        });
        yield graph.addVertex('2', {
            '1': yield weight(data.features[2].geometry["coordinates"], data.features[1].geometry["coordinates"], "2", "1"),
            '3': yield weight(data.features[2].geometry["coordinates"], data.features[3].geometry["coordinates"], "2", "3"),
        });
        yield graph.addVertex('3', {
            '4': yield weight(data.features[3].geometry["coordinates"], data.features[4].geometry["coordinates"], "3", "4"),
            '6': yield weight(data.features[3].geometry["coordinates"], data.features[6].geometry["coordinates"], "3", "4"),
        });
        yield graph.addVertex('4', {
            '5': yield weight(data.features[4].geometry["coordinates"], data.features[5].geometry["coordinates"], "3", "4"),
        });
        yield graph.addVertex('5', {
            '6': yield weight(data.features[5].geometry["coordinates"], data.features[6].geometry["coordinates"], "5", "6"),
            '11': yield weight(data.features[5].geometry["coordinates"], data.features[11].geometry["coordinates"], "5", "11"),
        });
        yield graph.addVertex('6', {
            '7': yield weight(data.features[6].geometry["coordinates"], data.features[7].geometry["coordinates"], "6", "4"),
            '10': yield weight(data.features[6].geometry["coordinates"], data.features[10].geometry["coordinates"], "6", "10"),
        });
        yield graph.addVertex('7', {
            '8': yield weight(data.features[7].geometry["coordinates"], data.features[8].geometry["coordinates"], "7", "8"),
        });
        yield graph.addVertex('8', {
            '14': yield weight(data.features[8].geometry["coordinates"], data.features[14].geometry["coordinates"], "8", "14"),
        });
        yield graph.addVertex('9', {
            '8': yield weight(data.features[9].geometry["coordinates"], data.features[8].geometry["coordinates"], "9", "8"),
        });
        yield graph.addVertex('10', {
            '9': yield weight(data.features[10].geometry["coordinates"], data.features[9].geometry["coordinates"], "10", "9"),
        });
        yield graph.addVertex('11', {
            '10': yield weight(data.features[11].geometry["coordinates"], data.features[10].geometry["coordinates"], "11", "10"),
            '12': yield weight(data.features[11].geometry["coordinates"], data.features[12].geometry["coordinates"], "11", "12"),
        });
        yield graph.addVertex('12', {
            '13': yield weight(data.features[12].geometry["coordinates"], data.features[13].geometry["coordinates"], "11", "10"),
        });
        yield graph.addVertex('13', {
            '14': yield weight(data.features[13].geometry["coordinates"], data.features[14].geometry["coordinates"], "13", "14"),
        });
        yield graph.addVertex('14');
        return 0;
    });
}
