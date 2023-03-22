export function getMoyenne(resultat) {
  let note = 0;
  resultat.map((item) => {
    note += item.historic.note;
  });
  return (note / resultat.length).toFixed(2);
}
