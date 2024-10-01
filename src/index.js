const principal = document.getElementById('principal');
const menuBtn = document.getElementById('menu-boton');
const menuBtnNav = document.getElementById('menu-btn')
const textomgr = document.getElementById('textomgrd');
const datepickk = document.querySelectorAll('.fecha')


if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
        
        if (isLargeScreen) {
            const isClosed = principal.classList.contains('cerrado');
            
            if (isClosed) {
                principal.classList.add('lg:grid-cols-[15rem_auto_16rem]');
                principal.classList.remove('lg:grid-cols-[5rem_auto_16rem]');
                textomgr.classList.remove('invisible');           
            } else {
                principal.classList.add('lg:grid-cols-[5rem_auto_16rem]');
                principal.classList.remove('lg:grid-cols-[15rem_auto_16rem]');
                textomgr.classList.add('invisible'); 
            }
        
            
            principal.classList.toggle('cerrado');
        }
    });
}

if (menuBtnNav && principal) {
    
    const closeMenu = () => {
        principal.classList.add('grid-cols-[4rem_auto]');
        principal.classList.remove('grid-cols-[14rem_auto]');
        principal.classList.add('cerrado');
    };

    
    const openMenu = () => {
        principal.classList.add('grid-cols-[14rem_auto]');
        principal.classList.remove('grid-cols-[4rem_auto]');
        principal.classList.remove('cerrado');
    };

    
    menuBtnNav.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const isClosed = principal.classList.contains('cerrado');
        
        if (isClosed) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    
    document.addEventListener('click', (event) => {
        
        if (!principal.contains(event.target) && event.target !== menuBtnNav) {
            closeMenu();
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {

    const columnas = document.querySelectorAll('.columna-1');

    
    columnas.forEach(columna => {
        columna.addEventListener('click', () => {
            
            if (columna.classList.contains('active')) {
                columna.classList.remove('active');
            } else {
                
                columnas.forEach(col => col.classList.remove('active'));
                
                columna.classList.add('active');
            }
        });
    });
});


const down = document.getElementById('down');
const dropdown = document.getElementById('dropdown');

if (down) {
    down.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const isClosed = dropdown.classList.contains('abierto');
        if (isClosed) {
            dropdown.classList.add('hidden');
            dropdown.classList.remove('flex');
        } else {
            dropdown.classList.remove('hidden');
            dropdown.classList.add('flex')
        }
        dropdown.classList.toggle('abierto');
    });

    
    document.addEventListener('click', (event) => {
        const isDropdownOpen = dropdown.classList.contains('abierto');
        
        if (isDropdownOpen && !dropdown.contains(event.target) && !down.contains(event.target)) {
            dropdown.classList.add('hidden');
            dropdown.classList.remove('abierto');
        }
    });
}








datepickk.forEach((datepick) => {
    if (datepick) {
        datepick.addEventListener('focus', function() {
            this.showPicker();
        });
    }
});

const inputImagenes = document.getElementById('Imagenes');
const fileList = document.getElementById('fileList');
const clearButton = document.getElementById('clearFiles');
let acumulatedFiles = []; // Array para acumular archivos

if(inputImagenes){
    inputImagenes.addEventListener('change', function(e) {
        // Añadir los nuevos archivos al array
        acumulatedFiles = [...acumulatedFiles, ...Array.from(this.files)];
        
        updateFileList();
    });
}


function updateFileList() {
    fileList.innerHTML = ''; // Limpiar la lista anterior
    
    if (acumulatedFiles.length > 0) {
        const list = document.createElement('ul');
        
        acumulatedFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            list.appendChild(li);
        });
        
        fileList.appendChild(list);
        console.log(`Se han acumulado ${acumulatedFiles.length} archivos.`);
    } else {
        fileList.textContent = 'No se han seleccionado archivos.';
    }
}

if(clearButton){
    clearButton.addEventListener('click', function() {
        acumulatedFiles = [];
        inputImagenes.value = ''; // Limpiar el input
        updateFileList();
    });
}



document.addEventListener('DOMContentLoaded', function() {
    // Cache selectors
    var lastId,
        topMenu = document.getElementById("menu-content"),
        topMenuHeight = topMenu.offsetHeight + 175,
        // All list items
        menuItems = topMenu.getElementsByTagName("a"),
        scrollItems = [];

    // Get corresponding anchor for each menu item
    for (var i = 0; i < menuItems.length; i++) {
        var item = document.querySelector(menuItems[i].getAttribute("href"));
        if (item) {
            scrollItems.push(item);
        }
    }

    // Bind click handler to menu items
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function(e) {
            var href = this.getAttribute("href"),
                offsetTop = document.querySelector(href).offsetTop - topMenuHeight + 1;
            
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
            e.preventDefault();
        });
    }

    // Bind to scroll
    window.addEventListener('scroll', function() {
        // Get container scroll position
        var fromTop = window.pageYOffset + topMenuHeight;

        // Get id of current scroll item
        var cur = [];
        for (var i = 0; i < scrollItems.length; i++) {
            if (scrollItems[i].offsetTop < fromTop) {
                cur.push(scrollItems[i]);
            }
        }
        cur = cur[cur.length - 1];
        var id = cur ? cur.id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            for (var i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove("font-bold", "text-yellow-600");
            }
            if (id) {
                document.querySelector('a[href="#' + id + '"]').classList.add("font-bold", "text-yellow-600");
            }
        }
    });
});

if (document.getElementById("btnModal")) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("closeModal")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function(event) {
        event.preventDefault(); 
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    };

    span.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "none";
        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-type-1'); // Asegurarse de seleccionar el formulario correcto
    const tableBody = document.querySelector('#data-table tbody');
    const addButton = document.querySelector('#botonModal');

    function reseteo(){
        const codigo= document.querySelector('#codigoP');
        const producto= document.querySelector('#nameP');
        const op= document.querySelector('#OpP');
        const defecto = document.querySelector('#defectoP');
        const nbobina= document.querySelector('#Nbobp');
        const cantidadRetirar= document.querySelector('#CantRP');
        const cantidadRecibida= document.querySelector('#cantReP');
        const observaciones= document.querySelector('#observap');

        codigo.value= "";
        producto.value= "";
        op.value= "";
        defecto.value="";
        nbobina.value= "";
        cantidadRetirar.value= "";
        cantidadRecibida.value= "";
        observaciones.value= "";

    }

    function addRowToTable(data) {
        const row = document.createElement('tr');
        row.className = 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600';

        row.innerHTML = `
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input type="checkbox" class="checkbox-row w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${data.codigo}</th>
            <td class="px-6 py-4">${data.producto}</td>
            <td class="px-6 py-4">${data.op}</td>
            <td class="px-6 py-4">${data.defecto}</td>
            <td class="px-6 py-4">${data.nbobina}</td>
            <td class="px-6 py-4">${data.cantidadRetirar}</td>
            <td class="px-6 py-4">${data.cantidadRecibida}</td>
            <td class="px-6 py-4">${data.observaciones}</td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        `;

        tableBody.appendChild(row);
    }

    addButton.addEventListener('click', function() {
        const formData = {
            codigo: document.querySelector('#codigoP').value,
            producto: document.querySelector('#nameP').value,
            op: document.querySelector('#OpP').value,
            defecto: document.querySelector('#defectoP').value,
            nbobina: document.querySelector('#Nbobp').value,
            cantidadRetirar: document.querySelector('#CantRP').value,
            cantidadRecibida: document.querySelector('#cantReP').value,
            observaciones: document.querySelector('#observap').value
        };

        addRowToTable(formData);


        reseteo(); 
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.querySelector('#deleteButton');
    const tableBody = document.querySelector('#data-table tbody');

    deleteButton.addEventListener('click', function(event) {

        event.preventDefault();


        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(function(row) {
            const checkbox = row.querySelector('.checkbox-row');
            if (checkbox && checkbox.checked) {

                row.remove();
            }
        });
    });
});


const sirequiere = document.getElementById('sirequiere');
const norequiere = document.getElementById('norequiere');
const contenedorformsi = document.getElementById('contenedorformsi');
const contenedorNo = document.getElementById('contenedorNo');

sirequiere.addEventListener("change", function(e) {
    if (this.checked){
        norequiere.checked= false
        contenedorformsi.classList.remove('hidden')
        contenedorformsi.classList.add('block')
        

        contenedorNo.classList.add('hidden')
        contenedorNo.classList.remove('block')
    }else{
        contenedorformsi.classList.add('hidden')

    }
})

norequiere.addEventListener("change", function(e) {
    if (this.checked){
        sirequiere.checked= false
        contenedorformsi.classList.add('hidden')
        contenedorformsi.classList.remove('block')

        contenedorNo.classList.remove('hidden')
        contenedorNo.classList.add('flex')
    }else{
        contenedorNo.classList.add('hidden')
    }
})















