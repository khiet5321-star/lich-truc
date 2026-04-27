const scriptURL = 'https://script.google.com/macros/s/AKfycbzNCH3_mI-LGBubzZAP9boD44tEv08df0aHD5l9r8uaqy5-FqtoLt2aQneGjESFNJHMBw/exec';

function loadData() {
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(item => {
                // Logic: Nếu trong Sheets ghi "Vắng" thì tích vào ô Checkbox
                const isVang = item.trangThai && item.trangThai.toLowerCase().includes('vắng');
                const checkedAttr = isVang ? 'checked' : '';
                const rowClass = isVang ? 'class="absent-row"' : '';

                html += `<tr ${rowClass}>
                    <td class="name-cell">${item.ten || ''}</td>
                    <td>${item.ngay || ''}</td>
                    <td class="checkbox-cell">
                        <input type="checkbox" ${checkedAttr} disabled>
                    </td>
                    <td style="font-style: italic; color: #27ae60;">${item.nguoiGiup || ''}</td>
                </tr>`;
            });
            document.getElementById('content').innerHTML = html;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('lichTable').style.display = 'table';
        })
        .catch(error => {
            document.getElementById('loading').innerHTML = '❌ Lỗi kết nối Sheets. Hãy kiểm tra lại!';
        });
}
loadData();
