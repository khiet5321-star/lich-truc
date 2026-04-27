const scriptURL = 'https://script.google.com/macros/s/AKfycbzNCH3_mI-LGBubzZAP9boD44tEv08df0aHD5l9r8uaqy5-FqtoLt2aQneGjESFNJHMBw/exec';

function loadData() {
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(item => {
                // Logic: Nếu cột trangThai có chữ "Vắng" thì KHÔNG tích, ngược lại thì TÍCH
                const isVang = item.trangThai && item.trangThai.toLowerCase().includes('vắng');
                const checkStatus = isVang ? '' : 'checked';
                const rowStyle = isVang ? 'class="absent-text"' : '';

                html += `<tr ${rowStyle}>
                    <td><input type="checkbox" ${checkStatus} disabled></td>
                    <td>${item.ngay || ''}</td>
                    <td>${item.ten || ''}</td>
                    <td class="helper-text">${item.nguoiGiup || ''}</td>
                </tr>`;
            });
            document.getElementById('content').innerHTML = html;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('lichTable').style.display = 'table';
        })
        .catch(error => {
            document.getElementById('loading').innerHTML = '❌ Lỗi tải dữ liệu. Hãy kiểm tra Google Sheets!';
        });
}
loadData();
