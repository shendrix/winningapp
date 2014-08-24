#!/usr/bin/ruby

dict = ARGV.shift

dict_file = File.new(dict)

dictionary = {}
dict_file.each do |line|
	tokens = line.split
	dictionary[tokens[0]] = tokens[1]
end

data_dir = ARGV.shift
Dir.entries(data_dir).each do |filename|
	filepath = "#{data_dir}/#{filename}"
	if File.file?(filepath)
		word_bag = {}
		data_file = File.new(filepath)
		data_file.each do |line|
			line.split.each do |token|
				token.downcase!
				token.gsub!(/[^a-z]/,"")
				if (dictionary.has_key?(token))
					word_bag[dictionary[token]] = 0 unless word_bag.has_key?(dictionary[token])
					word_bag[dictionary[token]] += 1
				end
			end	
		end
		record = "| "
		word_bag.each_key do |word_id|
			record += "#{word_id.to_s}:#{word_bag[word_id].to_s} "
		end
		puts record
	end
end
