from random import randint

results = []

for i in range(100000):
    toysGot = [False] * 5
    count = 0
    while not all(toysGot):
        toy = randint(0, 4)
        toysGot[toy] = True
        count += 1
    results.append(count)

print(sum(results) / len(results))
