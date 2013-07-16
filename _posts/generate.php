<?php

$rss = array('github' => 'https://github.com/kevee.atom');

foreach($rss as $feedname => $feed) {
	$xml = new SimpleXMLElement(file_get_contents($feed));
	foreach($xml as $name => $entry) {
		if($name == 'entry') {
			$id = md5($entry->id);
			$date = date('Y-m-d', strtotime($entry->published));
			$filename = 'rss/'. $date . '-'. $feedname .'-'. str_replace(array(' ', '/'), '-', strtolower($entry->title));
			if(!file_exists($filename)) {
				$file = fopen($filename .'.html', 'w');
				$output = '---
layout: rss
title: '. $entry->title .'
source: '. $feedname .'
tags:
 - rss
 - '. $feedname .'
---
';
				$output .= $entry->content;
				$output .= "\n";
				fwrite($file, $output);
				fclose($file);
			}
		}
	}
}

