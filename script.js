const scriptURL = 'https://script.google.com/macros/s/AKfycbzNCH3_mI-LGBubzZAP9boD44tEv08df0aHD5l9r8uaqy5-FqtoLt2aQneGjESFNJHMBw/exec';

function loadData() {
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(item => {
                // Kiểm tra nếu trạng thái là Vắng thì không tích, còn lại là tích
                const isChecked = item.trangThai && item.trangThai.includes('Vắng') ? '' : 'checked';
                const statusClass = isChecked ? 'present' : 'absent';
                const statusText = item.trangThai || 'Bình thường';

                html += `<tr>
                    <td><input type="checkbox" ${isChecked} disabled></td>
                    <td><b>${item.ngay || ''}</b></td>
                    <td style="color:#2d3436; font-weight:500;">${item.ten || ''}</td>
                    <td>${item.nguoiGiup || ''}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                </tr>`;
            });
            document.getElementById('content').innerHTML = html;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('lichTable').style.display = 'table';
        })
        .catch(error => {
            document.getElementById('loading').innerHTML = '❌ Lỗi kết nối dữ liệu!';
            console.error('Error!', error.message);
        });
}
loadData();
