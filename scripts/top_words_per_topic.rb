#!/usr/bin/ruby

topic_list = []

line_num = 0
ARGF.each do |line|
	line_num += 1
	tokens = line.split
	word = tokens[0]
	#puts line_num.to_s + "\t" + word
	tokens[1..-1].each_index do |topic_ndx|
		topic_score = tokens[topic_ndx]
		topic_list[topic_ndx] = [] if topic_list[topic_ndx].nil?
		topic_list[topic_ndx] << [word, topic_score]
	end
end

topic = 1
topic_list.each do |topic_words|
	topic_words.sort! {|a, b|
		b[1] <=> a[1]
	}
	out = topic.to_s
	topic_words[0..19].each do |word_score|
		out += "\t"
		out += word_score[0]
	end
	puts out
	topic += 1
end
