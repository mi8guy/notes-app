export default class NotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');
    return notes.sort((a, b) => {
      let number = new Date(a.updated) > new Date(b.updated) ? -1 : 1;
      return number;
    });
  }

  static saveNote(noteToSave) {
    let notes = NotesAPI.getAllNotes();
    const existing = notes.find((note) => note.id == noteToSave.id);
    console.log(existing);
    // Edit / Update
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
      // notes = notes.filter((note) => note.id != noteToSave.id);
      // notes.push(existing);
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem('notesapp-notes', JSON.stringify(notes));
  }

  static deleteNote(id) {
    let notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id);
    localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
  }
}
