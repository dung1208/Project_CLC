let btnAddNewStaff = document.getElementById('add-newStaff');
btnAddNewStaff.onclick = () => {
    window.location.href = '/staff/add';
}

let elementProduct = document.getElementsByClassName('element-staff');
for (i = 0; i < elementProduct.length; i++) {
    elementProduct[i].onclick = function () {
        let staffData = $(this).data('staff');
        window.location.href = '/staff/edit/'+staffData.Staff_id;
    };
}
