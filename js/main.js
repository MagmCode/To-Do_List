const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThroungh = 'line-through'
let id
let LIST

// Create Date 
const FECHA = new Date()
fecha.innerHTML= FECHA.toLocaleDateString('es-MX', {weekday:"long",month:"short",day:"numeric"})

// Add new task
function agregarTarea (tarea,id,realizado,eliminado) {

    if(eliminado) {return}

    const REALIZADO = realizado ?check:uncheck
    const LINE = realizado ?lineThroungh :''

    const elemento =  `
                        <li id=elemento>
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                        ` 
    lista.insertAdjacentHTML("beforeend", elemento)
}

// Taks Checked Function
function tareaRealizada(element){
    element.classList.toggle(check)
    
    element.classList.toggle(uncheck)

    element.parentNode.querySelector('.text').classList.toggle(lineThroungh)
    console.log(LIST[element.id].realizado)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true

    var toast = document.createElement('div');
			toast.classList.add('toast');
			toast.innerText = '¡Has completado una tarea!';

			document.body.appendChild(toast);

			setTimeout(function() {
				toast.remove();
			}, 3000);
    
}

// Delete Task Function
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    
    var toast = document.createElement('div');
			toast.classList.add('toast');
			toast.innerText = 'Has eliminado una tarea';

			document.body.appendChild(toast);

			setTimeout(function() {
				toast.remove();
			}, 3000);
		}

// Intro Function (icon)
botonEnter.addEventListener('click',() =>{
    const tarea = input.value

    if(tarea) {
        agregarTarea(tarea,id,false,false)
        
        var toast = document.createElement('div');
			toast.classList.add('toast');
			toast.innerText = 'Has agregado una tarea. Lista actualizada';

			document.body.appendChild(toast);

			setTimeout(function() {
				toast.remove();
			}, 3000);

        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('Todo',JSON.stringify(LIST))
    input.value= ''
    id++
})

// Intro function (Keyboard)
document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value

        if(tarea) {
            agregarTarea(tarea,id,false,false)
            
            var toast = document.createElement('div');
			toast.classList.add('toast');
			toast.innerText = 'Has agregado una tarea. Lista actualizada';

			document.body.appendChild(toast);

			setTimeout(function() {
				toast.remove();
			}, 3000);

            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
		
        localStorage.setItem('Todo',JSON.stringify(LIST))
        input.value=''
        id++
    }
})

// tareaRealizada y tareaEliminada Function
lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData==='realizado'){
        tareaRealizada(element)
    }   
    else if (elementData==='eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('Todo',JSON.stringify(LIST))
})

//Local storage get item
let data = localStorage.getItem('Todo')
    if(data){
        LIST=JSON.parse(data)
        id = LIST.length
        cargarLista(LIST)
    } else {
        LIST = []
        id = 0
    }

// Upload list function 
function cargarLista(DATA){
    DATA.forEach(function (i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}