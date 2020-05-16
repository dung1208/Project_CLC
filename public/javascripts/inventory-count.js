
// <script type="text/javascript">
//     $(document).ready(function() {
//         $('#example-getting-started').multiselect()
//         });
// </script>

$(document).ready(function () {
    $('#selectedColumn').DataTable({
      "aaSorting": [],
      columnDefs: [{
      orderable: false,
      targets: 3
      }]
    });
      $('.dataTables_length').addClass('bs-select');
    });