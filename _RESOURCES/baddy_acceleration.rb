##
# For working out how baddies should accelerate as player shoots them
# Last one should be fast, but not silly fast.

TOTAL_BADDIES = 55
INITIAL_RATE = 500

# Prints delay between baddy frames after all but 1 baddies have been shot.
def final_rate(initial_rate: INITIAL_RATE, &block)

  rate = initial_rate

  (TOTAL_BADDIES - 1).times do |n|
    rate = yield(n, rate)
  end

  p rate

end
