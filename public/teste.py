answers = open("/home/enzo/Downloads/PASTORAL DA ACOLHIDA.csv");
i = 1
for line in answers:
    if i < 4:
        i += 1
        continue
    fields = line.split(",")
    name = fields[1]
    days = fields[2]
    obs = fields[3]
    print(name, end=" - ")
    print(days, end=f" - ")
    print(obs)
