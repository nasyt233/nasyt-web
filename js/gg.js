// 显示弹窗函数

        function showPopup() {

            document.getElementById('overlay').style.display = 'flex';

        }



        // 关闭弹窗函数

        function closePopup() {

            document.getElementById('overlay').style.display = 'none';

        }



        // 页面加载完成后自动显示弹窗

        window.onload = function() {

            showPopup();

        };