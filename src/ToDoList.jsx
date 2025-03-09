import React, {useState} from "react";
function ToDo(){
    const [tasks,setTasks]= useState([])
    const [newTask,setNewTask]=useState({task:'',complete:false})
    const [edit,setEdit]=useState(null)
    const [taskEdit,setTaskEdit]=useState('')
   
    const taskChange=(e)=>{
        setNewTask({...newTask,task:e.target.value})

    }
    const AddTask=()=>{
        const existing = tasks.filter((task)=>
            newTask.task.toLowerCase()==task.task.toLowerCase()

        )
        if(newTask.task.length==0)return
        if(existing.length>0)return



        setTasks([newTask,...tasks])
        setNewTask({task:'',complete:false})
        
    }
    const DelTask=(i)=>{
        setTasks(tasks.filter((_,index)=>index!=i))
    

    }
    const TaskComplate=(i)=>{
      if(!tasks[i].complete){
        setTasks(t=>{
            const updatedTask= t.map((task,index)=>
            index==i?{...task,complete:true}:task
        )
            return moveDown(i,updatedTask)
        })
        
        
      }else{
        return
      }
 

    }
    const editTask=(i)=>{
        setEdit(i)
        setTaskEdit(tasks[i].task)
    }
   
    const moveDown=(i,updatedTask)=>{
        const task= updatedTask[i]
        const taskarr=updatedTask.filter((_,index)=>index!=i)
        return [...taskarr,task]
        

    }
    const saveEdit=(i)=>{
        setTasks(
            tasks.map((task,index)=>
                index==i?{...task,task:taskEdit}:task
            )
        )
        setEdit(null)
    }
  

    return (
        <>
            <div className="todo-container">
            <h1 className="todo-title">To-Do List</h1>
            <div className="todo-input-section">
                <input type="text" className="todo-input" placeholder="Enter the Task" value={newTask.task} onChange={(e) => taskChange(e)} />
                <button className="todo-add-btn" onClick={AddTask}>Add Task</button>
                
            </div>
            <ul className="todo-list">
                {tasks.map((task, i) => (
                    <li key={i} className="todo-item">
                        {edit === i ? (
                            <div className="todo-edit">
                                <input type="text" className="todo-edit-input" value={taskEdit} onChange={(e) => setTaskEdit(e.target.value)} />
                                <button className="todo-save-edit-btn" onClick={() => saveEdit(i)}>Save</button>
                                <button className="todo-cancel-edit-btn" onClick={() => setEdit(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="todo-task">
                                {task.complete ? <s className="todo-completed">{task.task}</s> : <span>{task.task}</span>}
                                {!task.complete && (
                                    <div className="todo-actions">
                                        <button className="todo-delete-btn" onClick={() => DelTask(i)}>Delete</button>
                                        <button className="todo-complete-btn" onClick={() => TaskComplate(i)}>Completed</button>
                                        <button className="todo-edit-btn" onClick={() => editTask(i)}>Edit</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>

         </>
    )
}
export default ToDo