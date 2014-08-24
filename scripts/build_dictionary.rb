#!/usr/bin/ruby

exclude_words = File.readlines("english.stop.txt").map{|word| word.chomp}


dictionary = {}
dir = ARGV.shift
Dir.entries(dir).each do |file|
	filename = "#{dir}/#{file}"
	if (File.file?(filename))
	f = File.new(filename)
	f.each do |line|
		line.split.each do |token|
			token.downcase!
			token.gsub!(/[^a-z]/,"")
			unless exclude_words.include?(token)
				dictionary[token] = 0 unless dictionary.has_key?(token) 
				dictionary[token] += 1
			end
		end
	end
	end	
end

word_id = 0

dictionary.each_key do |word|
	puts "#{word}\t#{word_id}"
	word_id += 1
end
