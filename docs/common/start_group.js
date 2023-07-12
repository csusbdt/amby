function c_start_group(dur, members = []) {
	this.dur     = dur;
	this.members = members;
	this.id      = null;
}

c_start_group.prototype.add = function(...m) {
    m.forEach(m => {
    	if (this.members.indexOf(m) === -1) {
    		this.members.forEach(m => m.stop());
    		this.members.push(m);
    		if (window.stop_audio !== null) this.members.forEach(m => m.start());
    	}        
    });
};

c_start_group.prototype.remove = function(...m) {
    m.forEach(m => {
    	let i = this.members.indexOf(m);
    	if (i !== -1) {
            m.stop();
    		this.members.splice(i, 1);
    	}
    });
};

c_start_group.prototype.next = function() {
	this.id = setTimeout(c_start_group.prototype.next.bind(this), this.dur);
};

c_start_group.prototype.start = function() {
	if (this.id === null) {
		this.members.forEach(m => m.start());
		this.id = setTimeout(c_start_group.prototype.next.bind(this), this.dur);
	}
};

c_start_group.prototype.stop = function() {
	if (this.id !== null) {
		clearTimeout(this.id);
		this.id = null;
		this.members.forEach(m => m.stop());
	}
};

export default c_start_group;
