export function expectShouldNotCallThis() {
	expect('should not call this').toEqual('but called');
}

export function expectShouldBeImplementTest() {
	expect('this test case must implement').toEqual('but not');
}
