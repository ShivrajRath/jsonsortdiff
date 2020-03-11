(function () {
        const inputfile1 = document.getElementById('input_1');
        inputfile1.addEventListener('change', function (e) {
            // console.log(inputfile1.files)
            const reader = new FileReader();
            reader.onload = function () {
                document.getElementById('t1').value = reader.result;
                // document.getElementById(tid2).value = sortStr2;
            };
            reader.readAsText(inputfile1.files[0])
        }, false);

        const inputfile2 = document.getElementById('input_2');
        inputfile2.addEventListener('change', function (e) {
            // console.log(inputfile2.files)
            const reader2 = new FileReader();
            reader2.onload = function () {
                document.getElementById('t2').value = reader2.result;
            }
            reader2.readAsText(inputfile2.files[0])
        }, false);


    }
)()
