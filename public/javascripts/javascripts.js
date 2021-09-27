const inputHTML={
    text:`
        <div class="x-form__group">
            <label for="REPLACE_NAME">REPLACE_NAME</label>
            <input type="text" name="REPLACE_NAME" id="REPLACE_NAME" placeholder="REPLACE_NAME" />
        </div>`,
    password:`
        <div class="x-form__group">
            <label for="REPLACE_NAME">REPLACE_NAME</label>
            <input type="password" name="REPLACE_NAME" id="REPLACE_NAME" placeholder="REPLACE_NAME" />
        </div>`,
    number:`<div class="x-form__group">
        <label for="REPLACE_NAME">REPLACE_NAME</label>
        <input type="number" min="0" name="REPLACE_NAME" id="REPLACE_NAME" placeholder="REPLACE_NAME" />
    </div>`,
    file:` <div class="x-form__group">
        <label class="x-form__file">
            <input type="file" id="contactFile" name="contactFile" class="x-form__file-input">
            <span class="x-form__file-control js--contact-form-file-control" data-file-name="Archivo..." data-btn-name="Selecionar"></span>
        </label>
    </div>`,
    select1:`
        <div class="x-form__group">
            <label for="sort">Sort</label>
            <select name="sort" id="sort">
                <option value="asc">Ascendente</option>
                <option value="desc">Desendente</option>
            </select>
        </div>
    `,
    select2:`
        <div class="x-form__group">
            <label for="ruta">Sort Field</label>
            <select name="sortField" id="sortField">
                <option value="name">name</option>
                <option value="segment1">segment1</option>
                <option value="segment2">segment2</option>
                <option value="segment3">segment3</option>
                <option value="segment4">segment4</option>
                <option value="platformId">platformId</option>
                <option value="clientId">clientId</option>
            </select>
        </div>
    `
}

const OPCIONES={
    "login":{
        "post":{
            "html": `<div class="x-form__group">${inputHTML["text"].replace(/REPLACE_NAME/gi,"user")} ${inputHTML["password"].replace(/REPLACE_NAME/g,"password")}</div>`,
            "ruta":"/user/login"
        }
    },
    "registro":{
        "post":{
            "ruta":"/user/register",
            "html":`<div class="x-form__group">${inputHTML["text"].replace(/REPLACE_NAME/gi,"user")} ${inputHTML["password"].replace(/REPLACE_NAME/g,"password")}</div>`
        }
    },
    "data":{
        "get":{
            html:`<div class="x-form__group">${inputHTML["text"].replace(/REPLACE_NAME/gi,"token")} </div> <div class="x-form__group"> ${inputHTML["number"].replace(/REPLACE_NAME/gi,"limit")} ${inputHTML["number"].replace(/REPLACE_NAME/g,"skip")}</div><div class="x-form__group">${inputHTML["select1"]} ${inputHTML["select2"]}</div>`,
            ruta:"/data"
        }
    },
    "file":{
        "post":{
            html:`

            <div class="x-form__group">${inputHTML["text"].replace(/REPLACE_NAME/gi,"token") }   </div>  ${inputHTML["file"] }`,
            ruta:'/file'
        },
        "get":{
            html:`<div class="x-form__group">${inputHTML["text"].replace(/REPLACE_NAME/gi,"token") } ${inputHTML["text"].replace(/REPLACE_NAME/gi,"Filename") } `,
            ruta:'/file'
        }
    }
}
const changeRuta=()=>{
    let ruta=$("select#ruta").val()
    if(!OPCIONES[ruta])
        return console.log("no existe la ruta  ")
    let arrayKey=Object.keys(OPCIONES[ruta])
    $("#opcMetodos").html(
        arrayKey.map( (key,index)=> ` 
        <div class="x-form__radio-field">
            <input name="metodo" type="radio" value="${key}"  id="${key}" ${!index?"checked":null} />
            <label for="${key}">${key.toUpperCase()}</label>
        </div>`)
    )
    changeMetodo(OPCIONES[ruta])
}
const changeMetodo=(ruta)=>{
    let ruta2=$("select#ruta").val()
    if(!OPCIONES[ruta2])
        return console.log("no existe la ruta  ")
    let metodo=$("input[name='metodo']:checked").val()
    if(!OPCIONES[ruta2][metodo])
        return console.log("no existe el metodo de la ruta  ")
    $(".x-contact-form__content.dinamic").html( OPCIONES[ruta2][metodo]["html"] )
}



const getFormData=($form)=>{
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


$(document).ready(function() {
    changeRuta()
    $(document).on('change',"select#ruta", function(){
        changeRuta()
    });

    $(document).on('change',"input[name='metodo']", function(){
        changeMetodo()
    });
    $(document).on('change',"input[type='file']", function(){

        $("span.x-form__file-control.js--contact-form-file-control").attr("data-file-name",$('#contactFile')[0].files[0].name)
    });
    

    $(document).on('submit',"#api_form", function(e){
        e.preventDefault()
        e.stopPropagation()
        let form=getFormData($(this))
        let ruta=OPCIONES[form.ruta][form.metodo]["ruta"]
        let method= form.metodo

        let tokenJWT=""
        if(form.token){
            tokenJWT=form.token
            delete( form.token)
        }
        delete( form.ruta )
        delete( form.metodo )
        let objFetch={
            method,
            headers:{"Content-Type":"application/json"}
        }

        if(method=="post")
            objFetch.body=JSON.stringify(form)
        else
            ruta=ruta+"?"+new URLSearchParams(form)
        if( tokenJWT)
            objFetch.headers["authorization"]=tokenJWT


        if( $("#contactFile").length){
            var formData = new FormData();
            formData.append('subida', $('#contactFile')[0].files[0]);
            objFetch.body = formData
            delete(objFetch.headers["Content-Type"])
        }

        fetch(ruta,objFetch)
        .then( res => res.json() )
        .then( response => {
            console.log( response )
        })


    });


})
