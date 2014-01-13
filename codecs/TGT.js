
exports.TYPE = 'radar-target';
exports.ID = 'TGT';

var APPROACHING = exports.APPROACHING = 1;
var RECEDING = exports.RECEDING = -1;

exports.decodeTGT = function (fields) {
    var ret = {
        type: 'radar-target'
    };
    ret.targets = [];
    fields = fields.slice(1);

    do {
        if (fields.length >= 3) {
            ret.targets.push({
                dir: +fields[0],
                speed: +fields[1],
                level: +fields[2]
            });
        }
        fields = fields.slice(3);
    } while (fields.length);
    return ret;
};

exports.decodeCNT = function (fields) {
    return {
        type:   'radar-cnt',
        dir:    +fields[1],
        speed:  +fields[2],
        level:  +fields[3],
        aprCnt: +fields[4],
        recCnt: +fields[5]
    };
};

exports.decodeSTA = function (fields) {
    return {
        type:       'radar-sta',
        dir:        1,
        count:      +fields[1],
        avgSpeed:   +fields[2],
        minSpeed:   +fields[3],
        maxSpeed:   +fields[4],
        roadOCP:    +fields[5],
        tmpCNT:     +fields[6]
    };
};

exports.decodeSTR = function (fields) {
    return {
        type:       'radar-sta',
        dir:        -1,
        count:      +fields[1],
        avgSpeed:   +fields[2],
        minSpeed:   +fields[3],
        maxSpeed:   +fields[4],
        roadOCP:    +fields[5],
        tmpCNT:     +fields[6]
    };
};
