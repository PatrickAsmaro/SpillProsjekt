let fartY = 15;
let paaBakken = true;


/**
 * Funksjonen hopp() starter et hopp når mellomromstasten trykkes.
 * 
 * Betingelser:
 * - event.code må være "Space" (mellomromstasten)
 * - paaBakken må være true (spilleren står på bakken)
 * 
 * Endrer:
 * - fartY til 15 (gir spilleren fart oppover)
 * - paaBakken til false (spilleren er i lufta)
 * 
 * @param {KeyboardEvent} event - Tastetrykk-hendelsen fra nettleseren
 */
function hopp(event) {
  if (event.code === "Space" && paaBakken) {
    event.preventDefault();  // Hindrer at siden scroller
    fartY = 15;
    paaBakken = false;
  }
}
