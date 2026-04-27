const scriptURL = 'https://script.google.com/macros/s/AKfycbzNCH3_mI-LGBubzZAP9boD44tEv08df0aHD5l9r8uaqy5-FqtoLt2aQneGjESFNJHMBw/exec';

function loadData() {
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(item => {
                html += `<tr>
                    <td>${item.ngay || ''}</td>
                    <td>${item.ten || ''}</td>
                    <td>${item.nguoiGiup || ''}</td>
                    <td><b style="color:${item.trangThai && item.trangThai.includes('Vắng') ? 'red' : 'green'}">${item.trangThai || 'Bình thường'}</b></td>
                </tr>`;
            });
            document.getElementById('content').innerHTML = html;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('lichTable').style.display = 'table';
        })
        .catch(error => {
            document.getElementById('loading').innerHTML = 'Lỗi kết nối dữ liệu!';
        });
}
loadData();
