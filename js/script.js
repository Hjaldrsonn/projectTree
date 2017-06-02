$(document).ready(function(){

	var formTemp = null;

	$(document).on('click', '.addChild', function(){
		$('.form').css({'display':'block'})
		$('form').css({'display':'flex', 'flex-direction':'column'})
		formTemp = $(this).parent().parent().children('.children')
		form()
	})

	$(document).on('click', '.delAll', function(){
		$(this).parent().parent().remove()
	})

// ------- Запись имени, картинки с input
	var image, name;
	 
	$('input[type=file]').change(function(){
	    image = this.files;

	});
	$('input[type=text]').change(function(){
	    name = $(this).val();
	});
//----------------------------------------

	$("form").submit(function(event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '"http://127.0.0.1:3000/',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function(returndata) {
                alert(returndata);
            }
        });

        return false;
    });

	// $.post('http://127.0.0.1:3000/', JSON.stringify(x), createChild() ).done(callback) 


	function form() {
		$(document).on('click', 'input[type=submit]', function(event) {
			addChild(formTemp);
			$('.form').css({'display':'none'});
			event.stopImmediatePropagation()
		} )
	}

	function addChild(param) {
		param.append(createChild(name))
	}


	function createChild(childName) {

		var child = $('<div class="child"></div>');

		var panel = $('<div class="panel"></div>');

			panel.append($('<button class="delAll">-</button>'));

			var info = $('<div class="info"></div>');

				info.append($('<p class="info_name">'+childName+'</p>'))
				info.append($('<img src="">'))

				panel.append(info);

			panel.append($('<button class="addChild">+</button>'));

		child.append(panel);
		child.append($('<div class="children"></div>'));

		return child;

	}
	


})
