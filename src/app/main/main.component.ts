import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number, 
  title: string,
  check: number, // i use number because in localCompare function, i can't use boolean 
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
      check: 0,  // 0 means uncheck
  });
  }

  ToggleEdit(id:number):void {
    this.isEditing[id] = !this.isEditing[id]; //Bila user tekan Edit,
    
    if (this.todoList[id].title == "") {
      this.todoList.splice(id, 1);
    }
  }

  // SaveEdit(id:number):void {
  //   this.isEditing[id] = false; // Save edit by setting editing state to false
  // }

  DeleteTodo(value:number):void {
    //console.log("delete  todo")
    this.todoList = this.todoList.filter(todo => todo.id != value) // Find index of todo with given id
    console.log(this.todoList)
    //console.log(index) 
    //this.todoList.splice(index, 1); // Remove the todo at the found index
  }

  SortTodo():void {
    console.log("sort  todo")

    if (this.sortStatus == 0) { //if 0 ascending ikut letter 
      console.log('ascending')
      this.todoList.sort((a, b) => a.check - b.check ||  a.title.localeCompare(b.title));
      this.sortStatus = 1; 

    } else { //if 1 descending ikut letter
      console.log('descending')
      this.sortStatus = 0;
      this.todoList.sort((a, b) => a.check - b.check  ||  b.title.localeCompare(a.title));
    }
  }

  CompleteTodo(id: number): void {
    const todo = this.todoList.find(todo => todo.id === id);

    if (todo) {
      //todo.check = 1
      
      todo.check = todo.check === 0 ? 1 : 0;  // if check equals 0 (representing 'not checked'), then set check to 1 (representing 'checked'), otherwise set check to 0 (representing 'unchecked').
      this.todoList.sort((a, b) => a.check - b.check );
      // //debug
      // for (let i = 0; i < this.todoList.length; i++) {
      //   console.log(this.todoList[i])
      // }
    } 

  }
}
