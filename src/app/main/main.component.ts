import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number, 
  title: string,
}


// interface TodoList {
//   todos: Todo[],
// }

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})


export class MainComponent {
  todoValue:string =''
  todoList:Array<Todo> = []
  currentID : number = 0  
  isEditing: boolean[] = [];
  sortStatus: number = 0; 

  AddTodo(value:string) {
    console.log("added new todo")
    console.log(this.todoList)
    this.currentID++
    this.todoList.push({
      id: this.currentID,
      title: value,
  });
  }

  ToggleEdit(id:number):void {
    this.isEditing[id] = !this.isEditing[id]; //Bila user tekan Edit, 
  }

  SaveEdit(id:number):void {
    this.isEditing[id] = false; // Save edit by setting editing state to false
  }

  DeleteTodo(value:number):void {
    console.log("delete  todo")
    const index = this.todoList.findIndex(todo => todo.id === value); // Find index of todo with given id
    this.todoList.splice(index, 1); // Remove the todo at the found index
  }

  SortTodo():void {
    console.log("sort  todo")

    if (this.sortStatus == 0) { //if 0 ascending ikut letter 
      console.log('ascending')
      this.todoList.sort((a, b) => a.title.localeCompare(b.title));
      this.sortStatus = 1; 

    } else { //if 1 descending ikut letter
      console.log('descending')
      this.sortStatus = 0;
      this.todoList.sort((a, b) => b.title.localeCompare(a.title));
    }
    
  }
}
