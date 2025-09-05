document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display'); /* Mengambil elemen layar kalkulator */
    const buttons = document.querySelectorAll('.btn'); /* Mengambil semua tombol dengan kelas .btn */
    
    /* Variabel yang akan menyimpan status kalkulator */
    let currentInput = ''; /* untuk angka yang sedang diketik */
    let operator = null; /* untuk operasi matematika */
    let previousInput = ''; /* untuk angka pertama sebelum operator ditekan */

    // Function to update the display
    function updateDisplay(value) { /* Memperbarui teks yang ditampilkan di layar kalkulator */
        display.textContent = value;
    }

    // Function to clear all
    function clear() { /* Mereset semua variabel ke kondisi awal dan mengosongkan layar, mirip dengan tombol C */
        currentInput = '';
        operator = null;
        previousInput = '';
        updateDisplay('0');
    }

    /*
    Fungsi ini dipanggil saat tombol angka atau titik ditekan.
    Fungsinya adalah menggabungkan angka yang diklik ke currentInput.
    Ada juga logika untuk mencegah lebih dari satu titik desimal
    */
    function handleNumber(button) {
        if (currentInput.includes('.') && button.textContent === '.') {
            return; // Prevent multiple decimal points
        }
        currentInput += button.textContent;
        updateDisplay(currentInput);
    }

    /*
    Fungsi ini dipanggil saat tombol operator (+, -, *, /) ditekan.
    Fungsinya adalah menyimpan angka yang sudah diketik ke previousInput dan menyimpan operator yang baru.
    Jika ada perhitungan yang tertunda,
    ia akan menjalankan calculate() terlebih dahulu
    */
    function handleOperator(button) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = button.textContent;
        previousInput = currentInput;
        currentInput = '';
    }

    /*
    Ini adalah inti dari kalkulator.
    Fungsi ini akan mengambil previousInput, currentInput, dan operator, lalu melakukan perhitungan menggunakan pernyataan switch.
    Setelah perhitungan, hasilnya disimpan di currentInput, dan variabel lainnya direset.
    Ada juga pemeriksaan untuk mencegah pembagian dengan nol
    */
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    clear();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay(currentInput);
    }

    // Add event listeners to all buttons
    buttons.forEach(button => { /* Perulangan pada setiap tombol untuk menambahkan event listener click */
        button.addEventListener('click', function() {
            
            /* Di dalam event listener, memeriksa kelas CSS dari setiap tombol untuk menentukan tindakan apa yang harus dilakukan.
            Misalnya, jika tombol memiliki kelas .number, akan memanggil handleNumber()
            */
            if (button.classList.contains('number')) {
                handleNumber(button);
            } else if (button.classList.contains('operator')) {
                handleOperator(button);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                clear();
            }
        });
    });

    clear(); // Initialize the display
});