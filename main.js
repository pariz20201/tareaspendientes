//''
const fecha=document.querySelector('#fecha'); //definición de constantes 
const lista=document.querySelector('#lista');
const elemento=document.querySelector('#elemento');
const input=document.querySelector('#input');
const botonagt=document.querySelector('#botonagt');
const check='bi-record-circle'
const tachado='tachado'
const uncheck='bi-circle'
let LIST, id;

const FECHA=new Date()
fecha.innerHTML=FECHA.toLocaleDateString('es-MX',{
    weekday:"long", month:"long", day:"numeric",})

//funcion agregar tarea
function agregarTarea(tarea,id,hecho,eliminar) 
{
    if (eliminar) {
        return
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '' 
    const elemento = `<li id="elemento">
                    <i id="${id}" data="hecho" class="bi ${realizado}"></i>
                    <p class="tarea-lista text ${LINE}">${tarea}</p>
                    <i id="${id}" data="eliminar" class="bi bi-x"></i>
                </li>`
                lista.insertAdjacentHTML("beforeend",elemento);
}

function tareaRealizada(element) {
    element.classList.toggle(check)  //revisa si el elemento esta check o uncheck/
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(tachado)
    LIST[element.id].realizado=LIST[element.id].realizado ? false : true

}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
};

botonagt.addEventListener("click",() => {
    const tarea = input.value
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre:tarea, 
            id:id, 
            hecho:false, 
            eliminar:false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST))
        id++;
        input.value=" ";
    }
})

lista.addEventListener("click", function(event){
    const element=event.target
    const elementData=element.attributes.data.value
    if (elementData=="hecho") {
        tareaRealizada(element)
    } else if(elementData=="eliminar") {
        tareaEliminada(element)
    };
    localStorage.setItem("TODO", JSON.stringify(LIST))
})

let data=localStorage.getItem("TODO")
if (data) {
    LIST.JSON.parse(data)
    id=LIST.length
    cargarLista(LIST)
} else {
    LIST={}
    id=0
}
/esto hace que toda la info se guarde/
function cargarLista(array) {
    array.forEach(
        function (item) {
            agregarTarea(item.nombre, item.id, item.hecho, ite.eliminar)
        }
    )
}