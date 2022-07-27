console.log('Loading')
getData = () => {
    $('#email, #password').focus(() => {
        //œ $('.alert').slideUp("slow");
        $('.alert').fadeOut(1200);
    })
    const email = $('#email').val();
    const password = $('#password').val();

    return {
        email,
        password
    }
}
$(document).ready(() => {
    document.querySelector('.logbtn').addEventListener('click', (e) => {
        e.preventDefault();
        let data = {
            ...getData()
        };
        console.log(data)

        $.post('http://localhost:8080/login', {
            data: data
        }, (data, status) => {
            console.log(data)
            if (data.data === "NO") {
                //$('.alert').prop('hidden', false);
                // $('.alert').slideDown("slow"); 
                $('.alert').fadeIn(1200);
            } else {
                console.log(data)
                window.location = "http://localhost:8080/userhome/id/" + data.id
            }
        });
    })

})