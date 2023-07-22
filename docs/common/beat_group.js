function c_beat_group(dur) {
	this.dur     = dur;
	this.members = [];
	this.joiners = [];
	this.id      = null;
}

c_beat_group.prototype.add = function(a) {
	if (!Array.isArray(a)) a = [ a ];
	a.forEach(m => {
		if (this.members.indexOf(m) === -1 && this.joiners.indexOf(m) === -1) {
			this.joiners.push(m);
		}
	});
};

c_beat_group.prototype.remove_all = function() {
	Array.from(this.members).forEach(m => this.remove(m));
	this.joiners.length = 0;
};

c_beat_group.prototype.remove = function(a) {
	if (!Array.isArray(a)) a = [ a ];
	a.forEach(m => {
		let i = this.members.indexOf(m);
		if (i !== -1) {
	        m.stop();
			this.members.splice(i, 1);
		}
		i = this.joiners.indexOf(m);
		if (i !== -1) this.joiners.splice(i, 1);
	});
};

c_beat_group.prototype.next = function() {
	while (this.joiners.length > 0) {
		const m = this.joiners.pop();
        m.start();
		this.members.push(m);
	}
	this.id = setTimeout(c_beat_group.prototype.next.bind(this), this.dur);
};

c_beat_group.prototype.start = function() {
	if (window.stop_audio === null) return;
	if (this.id === null) {
		while (this.joiners.length > 0) {
			this.members.push(this.joiners.pop());
		}
		this.members.forEach(m => m.start());
		this.id = setTimeout(c_beat_group.prototype.next.bind(this), this.dur);
	}
};

c_beat_group.prototype.stop = function() {
	if (this.id !== null) {
		clearTimeout(this.id);
		this.id = null;
		this.members.forEach(m => m.stop());
		while (this.joiners.length > 0) {
			this.members.push(this.joiners.pop());
		}
	}
};

export default c_beat_group;
