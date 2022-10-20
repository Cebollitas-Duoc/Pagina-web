function reveal(checkbox, id)
      {
      if(checkbox.checked)
         {document.getElementById(id).type='text';}
      else
      document.getElementById(id).type='password';
      }
