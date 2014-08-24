#!/usr/bin/ruby

dict = ARGV.shift

dict_file = File.new(dict)

rev_dictionary = {}
dict_file.each do |line|
	tokens = line.split
	rev_dictionary[tokens[1]] = tokens[0]
end

topic_file = File.new(ARGV.shift)

first = true
topic_file.each do |line|
	tokens = line.split
	if first
		header = "word"
		topic = 1
		tokens[1..-1].each do |tok|
			header += "\t#{topic}"
			topic += 1
		end	
		puts header
		first = false
	end
	tokens[0] = rev_dictionary[tokens[0]]
	keep = false
	tokens[1..-1].each do |score|
		keep = true if score.to_f > 1
	end
	puts tokens.join("\t") if keep
end
