document.addEventListener('DOMContentLoaded',function(event){
  var dataText = [ "Ich bin Entwickler", "Ich bin DevOps Engineer", "Hallo, ich bin Miloš!"];
  

  function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
     document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    else if (typeof fnCallback == 'function') {
      setTimeout(fnCallback, 700);
    }
  }
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }

    if (i < dataText.length) {
     typeWriter(dataText[i], 0, function(){
       StartTextAnimation(i + 1);
     });
    }
  }
  StartTextAnimation(0);
});

document.querySelectorAll('.image-container').forEach(container => {
  const tooltip = container.querySelector('.tooltip');

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.opacity = 1;
  });

  container.addEventListener('mouseleave', () => {
    tooltip.style.opacity = 0;
  });
});

document.querySelectorAll('details.project').forEach((detail) => {
  const summary = detail.querySelector('summary');
  const content = detail.querySelector('.content');
  

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    const isOpen = detail.classList.contains('open');
    console.log(isOpen)
    if (isOpen) {
      content.style.maxHeight = content.scrollHeight*2 + 'px';
      requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      });

      setTimeout(() => {
        detail.classList.remove('open');
      }, 400); 
    } else {
      detail.classList.add('open');
      content.style.maxHeight = content.scrollHeight*2 + 'px';
      content.style.opacity = '1';
    }
  });
});

document.getElementById("kontaktformular").addEventListener("submit", async function (e) {
  e.preventDefault(); 

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const jsondata = JSON.stringify(data)
  console.log(jsondata)
  try {
    const response = await fetch("https://kontakt.milosdenck.de/send", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    if (response.ok) {
      alert("Nachricht wurde erfolgreich gesendet!");
      form.reset(); 
    } else {
      const errorText = await response.text();
      alert(errorText);
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert("Netzwerkfehler beim Senden.");
  }
});




