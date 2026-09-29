// FACULTY DATA — St. Alphonsus Catholic School, High School Dept., S.Y. 2026-2027
// Source: SACS-HS-FACULTY-26-27 (v2). ids t1..t64 match the numbers in that list.
// Emails follow the school pattern [initials of first name(s)].[surname]@sacs.edu.ph,
// confirmed against the 3 emails written in the doc (Abadiez, Abella, Acosta) plus
// the aj.refulle@sacs.edu.ph example — the rest are generated from that pattern, not
// individually confirmed, so double check any that look unusual before relying on them.
// Swap for a fetch() to your PythonAnywhere API later; keep these shapes:
//   SUBJECTS[].teachers[] = {id, name, short, email}   LETTERS[teacherId][] = {from, text, bg}

// Set to true to preview letters before the October 2 reveal time.
const FORCE_UNLOCK = false;

const SUBJECTS = [
  { id: "math", name: "Math", c1: "#7fd4ff", c2: "#2a5bd7", teachers: [
    { id: "t3", name: "Jean G. Acosta", short: "Acosta", email: "j.acosta@sacs.edu.ph" },
    { id: "t9", name: "Donald V. Baluran", short: "Baluran", email: "d.baluran@sacs.edu.ph" },
    { id: "t11", name: "Merly C. Beldeniza", short: "Beldeniza", email: "m.beldeniza@sacs.edu.ph" },
    { id: "t13", name: "Erlene Mareia Z. Blanco", short: "Blanco", email: "em.blanco@sacs.edu.ph" },
    { id: "t24", name: "Marla O. Catadman", short: "Catadman", email: "m.catadman@sacs.edu.ph" },
    { id: "t37", name: "Annabelle B. Gualiza", short: "Gualiza", email: "a.gualiza@sacs.edu.ph" },
    { id: "t45", name: "Christian Fine C. Navarro", short: "Navarro", email: "cf.navarro@sacs.edu.ph" },
    { id: "t64", name: "Wendyl Cris L. Tuñacao", short: "Tuñacao", email: "wc.tunacao@sacs.edu.ph" }
  ] },
  { id: "science", name: "Science", c1: "#9af0c0", c2: "#1f8f6a", teachers: [
    { id: "t1", name: "Jerilee P. Abadiez", short: "Abadiez", email: "j.abadiez@sacs.edu.ph" },
    { id: "t2", name: "Albena A. Abella", short: "Abella", email: "a.abella@sacs.edu.ph" },
    { id: "t10", name: "Marjorie T. Bantilan", short: "Bantilan", email: "m.bantilan@sacs.edu.ph" },
    { id: "t21", name: "Jon Michael Vincent C. Casaba", short: "Casaba", email: "jmv.casaba@sacs.edu.ph" },
    { id: "t25", name: "Arpe O. Catagbo", short: "Catagbo", email: "a.catagbo@sacs.edu.ph" },
    { id: "t29", name: "Jenaiza R. Deresas", short: "Deresas", email: "j.deresas@sacs.edu.ph" },
    { id: "t32", name: "Claire A. Flores", short: "Flores", email: "c.flores@sacs.edu.ph" },
    { id: "t39", name: "Gemaeka V. Juban", short: "Juban", email: "g.juban@sacs.edu.ph" }
  ] },
  { id: "english", name: "English", c1: "#ffb3d1", c2: "#c2377a", teachers: [
    { id: "t4", name: "Mari Auralyn Y. Aguihon", short: "Aguihon", email: "ma.aguihon@sacs.edu.ph" },
    { id: "t14", name: "Ryanissa G. Borbajo", short: "Borbajo", email: "r.borbajo@sacs.edu.ph" },
    { id: "t17", name: "Cherra Mae C. Caballes", short: "Caballes", email: "cm.caballes@sacs.edu.ph" },
    { id: "t19", name: "Paul Bert N. Cadampog", short: "Cadampog", email: "pb.cadampog@sacs.edu.ph" },
    { id: "t26", name: "Carylle Jane T. Cuizon", short: "Cuizon", email: "cj.cuizon@sacs.edu.ph" },
    { id: "t35", name: "Christian Francis P. Gilig", short: "Gilig", email: "cf.gilig@sacs.edu.ph" },
    { id: "t38", name: "Lyra Jazel A. Hayag", short: "Hayag", email: "lj.hayag@sacs.edu.ph" },
    { id: "t48", name: "Alona R. Pino", short: "Pino", email: "a.pino@sacs.edu.ph" },
    { id: "t52", name: "Maribel D. Reubal", short: "Reubal", email: "m.reubal@sacs.edu.ph" }
  ] },
  { id: "filipino", name: "Filipino", c1: "#ffd88a", c2: "#d9822b", teachers: [
    { id: "t7", name: "Sheena Rose D. Astorga", short: "Astorga", email: "sr.astorga@sacs.edu.ph" },
    { id: "t15", name: "Cathyrine D. Buhisan", short: "Buhisan", email: "c.buhisan@sacs.edu.ph" },
    { id: "t18", name: "Joshua Z. Cabisas", short: "Cabisas", email: "j.cabisas@sacs.edu.ph" },
    { id: "t51", name: "Melyn Marie M. Regado", short: "Regado", email: "mm.regado@sacs.edu.ph" },
    { id: "t59", name: "Honey Lyn U. Solis", short: "Solis", email: "hl.solis@sacs.edu.ph" }
  ] },
  { id: "mapeh", name: "MAPEH", c1: "#d3b8ff", c2: "#6b3fd1", teachers: [
    { id: "t12", name: "Anthony Mhil D. Bermoy", short: "Bermoy", email: "am.bermoy@sacs.edu.ph" },
    { id: "t16", name: "Gabriel S Bustos", short: "Bustos", email: "g.bustos@sacs.edu.ph" },
    { id: "t28", name: "Andrea Shara P. Deferia", short: "Deferia", email: "as.deferia@sacs.edu.ph" },
    { id: "t44", name: "Maria Kristine C. Menina", short: "Menina", email: "mk.menina@sacs.edu.ph" },
    { id: "t58", name: "Nelmar L. Sintos", short: "Sintos", email: "n.sintos@sacs.edu.ph" },
    { id: "t60", name: "Edgardo Jr.P. Soqueño", short: "Soqueño", email: "e.soqueno@sacs.edu.ph" }
  ] },
  { id: "social", name: "Social Studies", c1: "#ffa89a", c2: "#c0392b", teachers: [
    { id: "t6", name: "Mary Grace L. Amodia", short: "Amodia", email: "mg.amodia@sacs.edu.ph" },
    { id: "t8", name: "Rhyca Jianne A. Avila", short: "Avila", email: "rj.avila@sacs.edu.ph" },
    { id: "t31", name: "Alms Millicent A. Flores", short: "Flores", email: "am.flores@sacs.edu.ph" },
    { id: "t33", name: "John Carlo C. Gamao", short: "Gamao", email: "jc.gamao@sacs.edu.ph" },
    { id: "t47", name: "Jean Mariel G. Orboc", short: "Orboc", email: "jm.orboc@sacs.edu.ph" },
    { id: "t56", name: "Francis Justine Q. Silawan", short: "Silawan", email: "fj.silawan@sacs.edu.ph" },
    { id: "t61", name: "Roque John P. Taladro", short: "Taladro", email: "rj.taladro@sacs.edu.ph" }
  ] },
  { id: "tle", name: "TLE", c1: "#d4f58a", c2: "#6a9a1f", teachers: [
    { id: "t5", name: "Luel S. Alesna", short: "Alesna", email: "l.alesna@sacs.edu.ph" },
    { id: "t30", name: "Alfredo Q. Devocion", short: "Devocion", email: "a.devocion@sacs.edu.ph" },
    { id: "t42", name: "Christine E. Mamotos", short: "Mamotos", email: "c.mamotos@sacs.edu.ph" },
    { id: "t46", name: "Maria Dolores V. Noval", short: "Noval", email: "md.noval@sacs.edu.ph" },
    { id: "t50", name: "Arden Jose Refulle", short: "Refulle", email: "aj.refulle@sacs.edu.ph" },
    { id: "t55", name: "Kenneth L. Salas", short: "Salas", email: "k.salas@sacs.edu.ph" },
    { id: "t57", name: "Leah Y. Singuit", short: "Singuit", email: "l.singuit@sacs.edu.ph" }
  ] },
  { id: "cle", name: "CLE", c1: "#e6e2d3", c2: "#8c7f5c", teachers: [
    { id: "t20", name: "Janet N. Campo", short: "Campo", email: "j.campo@sacs.edu.ph" },
    { id: "t23", name: "Nilo E. Castro", short: "Castro", email: "n.castro@sacs.edu.ph" },
    { id: "t36", name: "Jocyl S. Guanzon", short: "Guanzon", email: "j.guanzon@sacs.edu.ph" },
    { id: "t54", name: "Renante C. Rocal", short: "Rocal", email: "r.rocal@sacs.edu.ph" }
  ] },
  { id: "values", name: "Values Education", c1: "#ffe08a", c2: "#b8860b", teachers: [
    { id: "t27", name: "John Carlo Dacullo", short: "Dacullo", email: "jc.dacullo@sacs.edu.ph" },
    { id: "t63", name: "Charisse Jade A. Tangub", short: "Tangub", email: "cj.tangub@sacs.edu.ph" }
  ] },
  { id: "offices", name: "Offices", c1: "#b8c4d6", c2: "#4a5a78", teachers: [
    { id: "t22", name: "Glenda S. Castro", short: "Castro", email: "g.castro@sacs.edu.ph" },
    { id: "t34", name: "Sr. Marjorie G. Genada", short: "Genada", email: "m.genada@sacs.edu.ph" },
    { id: "t40", name: "Cindy Y. Lazarte", short: "Lazarte", email: "c.lazarte@sacs.edu.ph" },
    { id: "t41", name: "Eldren Joseph G. Luzano", short: "Luzano", email: "ej.luzano@sacs.edu.ph" },
    { id: "t43", name: "Joni C. Mansueto", short: "Mansueto", email: "j.mansueto@sacs.edu.ph" },
    { id: "t49", name: "Mark Angelo Ramos", short: "Ramos", email: "ma.ramos@sacs.edu.ph" },
    { id: "t53", name: "Princess Lovella Robles", short: "Robles", email: "pl.robles@sacs.edu.ph" },
    { id: "t62", name: "Joy F. Tanate", short: "Tanate", email: "j.tanate@sacs.edu.ph" }
  ] },
];

// Flattened list + lookup helper, used by the login page to match a teacher's email.
const TEACHERS = SUBJECTS.flatMap((s) => s.teachers.map((t) => ({ ...t, subject: s.name })));
function findTeacherByEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  if (!e) return null;
  return TEACHERS.find((t) => t.email && t.email.toLowerCase() === e) || null;
}

// Sample letters for testing only (t3 = Jean G. Acosta, Mathematics). Delete once the backend is wired up.
const LETTERS = {
  t3: [
    { from: "Anonymous", text: "Thank you for being patient with us, even when we keep asking the same question.", bg: "#fff1a8" },
    { from: "A grateful student", text: "Happy Teachers' Day! Math finally makes sense because of you.", bg: "#b5e8ff" },
  ],
};
