function setUpHTMLFixture() {
   jasmine.getFixtures().set(' <input id="length-input" class="estimate-input" type="text" placeholder="Length in inches" />');
}

describe("A suite", function() {
   beforeEach(function() {
        setUpHTMLFixture();
        $( "#length-input" ).data(formText);
      //   $( ".textField" ).val(formText);
      //   $(".showButton").click();
    });

   it('should have length-input id element in the DOM', function() {
      expect($j('#length-input')).toBeInDOM(); // $j = jquery 2.1.1
   });

    it ("should invoke the length-input keyup event.", function() {
     var spyEvent = spyOnEvent('#length-input', 'keyup');
     $j('#length-input').trigger( "keyup" );

     expect('keyup').toHaveBeenTriggeredOn('#length-input');
     expect(spyEvent).toHaveBeenTriggered();
   });

});
