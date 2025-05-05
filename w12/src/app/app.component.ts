import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'w12';
  todos : {id: number , text : string }[] = [];
  newTodo : string = '';
  ngOnInit(): void {
      if(typeof window !== 'undefined')
      {
        this.loadTodo();
      }
  }
  loadTodo()
  {
    this.todos = JSON.parse(localStorage.getItem('todos')||'[]');
  }
  addTodo()
  {
    if(this.newTodo.trim() === '') return ;
    this.todos.push({id: Date.now() , text : this.newTodo});
    localStorage.setItem('todos' , JSON.stringify(this.todos));
    this.loadTodo();
  }
  deleteTodo(id : number)
  {
    this.todos = this.todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos' , JSON.stringify(this.todos));
    this.loadTodo();
  }
  editTodo(id : number)
  {
    const updatedText = prompt("Enter the edit text" , this.todos.find(todo=> todo.id === id)?.text || '');
    if(updatedText === null)
    {
      return;
    }
    this.todos.forEach(todo => {
      if(todo.id === id) todo.text   = updatedText;
    });
    localStorage.setItem('todos' , JSON.stringify(this.todos));
    
  }

}