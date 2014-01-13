var should = require('should');

describe('TGT parsing', function () {
    it('parses ok', function () {
        var msg = require("../nmea.js").parse("$RDTGT*51");
        msg.should.have.property('type', 'radar-target');
        msg.targets.should.be.instanceof(Array).and.have.lengthOf(0);

        msg = require("../nmea.js").parse("$RDTGT,-1,97,1010*6F");
        msg.should.have.property('type', 'radar-target');
        msg.targets.should.be.instanceof(Array).and.have.lengthOf(1);
        msg.targets.should.be.eql([{dir: -1, speed: 97, level: 1010}]);

        msg = require("../nmea.js").parse("$RDTGT,-1,97,1010,-1,97,1010*51");
        msg.should.have.property('type', 'radar-target');
        msg.targets.should.be.instanceof(Array).and.have.lengthOf(2);
        msg.targets.should.be.eql([{dir: -1, speed: 97, level: 1010},
            {dir: -1, speed: 97, level: 1010}]);
    });
});

describe('STA parsing', function () {
    it('parses ok', function () {
        var msg = require("../nmea.js").parse("$RDSTA,0,0,0,0,0,0*50");
        msg.should.have.property('type', 'radar-sta');
        msg.should.have.property('dir', 1);
        msg.should.have.property('count', 0);
        msg.should.have.property('avgSpeed', 0);
        msg.should.have.property('minSpeed', 0);
        msg.should.have.property('maxSpeed', 0);
        msg.should.have.property('roadOCP', 0);
        msg.should.have.property('tmpCNT', 0);
    });
});

describe('STR parsing', function () {
    it('parses ok', function () {
        var msg = require("../nmea.js").parse("$RDSTR,0,0,0,0,0,0*43");
        msg.should.have.property('type', 'radar-sta');
        msg.should.have.property('dir', -1);
        msg.should.have.property('count', 0);
        msg.should.have.property('avgSpeed', 0);
        msg.should.have.property('minSpeed', 0);
        msg.should.have.property('maxSpeed', 0);
        msg.should.have.property('roadOCP', 0);
        msg.should.have.property('tmpCNT', 0);
    });
});

describe('CNT parsing', function () {
    it('parses ok', function () {
        var msg = require("../nmea.js").parse("$RDCNT,-1,97,1010,0,0,0*6D");
        msg.should.have.property('type', 'radar-cnt');
        msg.should.have.property('dir', -1);
        msg.should.have.property('speed', 97);
        msg.should.have.property('level', 1010);
        msg.should.have.property('aprCnt', 0);
        msg.should.have.property('recCnt', 0);
    });
});
