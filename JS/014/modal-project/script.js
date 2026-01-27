
let modal = document.getElementById('mymodal');

function showModal(){
  modal.style.display = 'block';
}

function hideModal(){
  modal.style.display = 'none';
}

document.querySelector('.showModal').addEventListener('click', showModal);
document.querySelector('.btncancel').addEventListener('click', hideModal);
document.querySelector('.btndelete').addEventListener('click', hideModal);

document.addEventListener('keydown', function(e){
  console.log(e.key)
  if (e.key == 'Escape'){
    hideModal();
  }
});