$data = $_POST['data'];
$f = fopen('betsdata.txt', 'a');
fwrite(f, $data);
fclose($f);