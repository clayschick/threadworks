var Calc = {
   init: function init(settings) {
      Calc.config = {
         lengthInput: $("#length-input"),
         widthInput: $("#width-input"),
         badingInput: $("#bading"),
         threadInput: $("#thread"),
         priceText: $("#price-text")
      };

      // Allow overriding the default config
      $.extend(Calc.config, settings);

      Calc.setup();
   },
   setup: function setup() {
      Calc.config.lengthInput
         .keyup(Calc.setValue)
         .data("type", "length");
      Calc.config.widthInput
         .keyup(Calc.setValue)
         .data("type", "width");
      Calc.config.badingInput
         .change(Calc.setValue)
         .data("type", "bading");
      Calc.config.threadInput
         .change(Calc.setValue)
         .data("type", "thread");
   },
   setValue: function setValue() {
      Calc.priceData[$(this).data("type")] = parseFloat($(this).val());
      Calc.computePrice();
   },
   priceData: {
      length: 0.00,
      width: 0.00,
      bading: 0.00,
      thread: 0.05,
      labor: 0.02
   },
   computePrice: function computePrice() {
      var dimensions = Calc.priceData.length * (Calc.priceData.width + Calc.priceData.bading)
      var labor = Calc.priceData.labor + Calc.priceData.thread;
      var price = labor * dimensions;
      Calc.config.priceText.text("$" + $.number(price, 2));
   }
}

$(document).ready(Calc.init);
