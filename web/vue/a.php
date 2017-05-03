<?php
	$origin_str = file_get_contents('./a.txt');
	echo $origin_str;
	file_put_contents('./a.txt', $_GET['data']);
?>