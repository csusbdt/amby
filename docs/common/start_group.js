function c_start_group(members = []) {
	this.members = members;
}

c_start_group.prototype.set = function(a) {
	if (!Array.isArray(a)) a = [ a ];
	if (this.members.every(m => a.includes(m)) &&
		a.every(m => this.members.includes(m))) {
		return;
	}
	stop(this.members);
	this.members.length = 0;
	this.members.push(...a);
	if (window.stop_audio !== null) this.members.forEach(m => m.start());
};

c_start_group.prototype.add = function(a) {
	if (!Array.isArray(a)) a = [ a ];
	a = a.filter(m => this.members.indexOf(m) === -1);
	if (a.length !== 0) {
		this.stop();
		this.members.push(...a);
	}
	if (window.stop_audio !== null) {
		this.members.forEach(m => m.start());
	}
};

c_start_group.prototype.remove = function(a) {
	if (!Array.isArray(a)) a = [ a ];
    a.forEach(m => {
    	let i = this.members.indexOf(m);
    	if (i !== -1) {
            m.stop();
    		this.members.splice(i, 1);
    	}
    });
};

c_start_group.prototype.remove_all = function() {
	this.stop();
	this.members.length = 0;
};

c_start_group.prototype.start = function() {
	if (window.stop_audio !== null) {
		this.members.forEach(m => m.start());
	}
};

c_start_group.prototype.stop = function() {
	this.members.forEach(m => m.stop());
};

export default c_start_group;
