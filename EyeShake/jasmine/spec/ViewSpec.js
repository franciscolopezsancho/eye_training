describe("View", function() {
  

  beforeEach(function() {
	 view = new View();
  });

  it("1 should be able to create 2 string of similar length", function() {
    expect(["should ","be able"]).toEqual(view.redistribute("should be able",2));
  });
  
  it("2 should be able to create 2 string of similar length", function() {
    expect(["should ","beeeeeeper able"]).toEqual(view.redistribute("should beeeeeeper able",2));
  });
  
  it("3 should be able to create 2 string of similar length", function() {
    expect(["should not ","beeeeeeper able"]).toEqual(view.redistribute("should not beeeeeeper able",2));
  });
  
  
  it("4 should be able to create 2 string of similar length", function() {
    expect(["a beeeeeeper"," not"]).toEqual(view.redistribute("a beeeeeeper not",2));
  });
  
  it("5 should be able to create 2 string of similar length", function() {
    expect(["En la prehistoria"," surgieron las"]).toEqual(view.redistribute("En la prehistoria surgieron las",2));
  });
  
 it("6 should be able to create 2 string of similar length", function() {
    expect([" en ","general,"]).toEqual(view.redistribute(" en general,",2));
  }); 
  
  it("7 should be able to create 2 string of similar length", function() {
     expect(["La historia"," del arte ","es muy chuli"]).toEqual(view.redistribute("La historia del arte es muy chuli",3));
   }); 
  
  
  
  
});
