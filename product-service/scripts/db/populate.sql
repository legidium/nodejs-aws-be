insert into "products" (id, title, description, price) values
    ('dd149ab6-f1be-4ba1-9b47-d5db239eb45e', 'Lambswool', 'Lambswool comes from the first shearing of a young sheep (lamb) which is shorn', 100),
    ('e3315493-c923-4412-8c14-e7ade4a55bb2', 'Merino Wool', 'Merino wool comes from the merino breed of sheep which have their origins in Spain', 200),
    ('fa3ddd66-3f98-4d84-a4e6-a89f0c047693', 'Shetland Wool', 'Shetland sheep, from the Shetland Islands of Scotland', 250),
    ('65ca670d-1320-4773-9ac2-82a4fcf1bbda', 'Mohair', 'Mohair comes from the Angora goat and is distinct from other wools for several reasons', 340),
    ('6f407c55-605b-4155-a881-84565aff130a', 'Cashmere', 'Cashmere is shorn from the undercoat of cashmere (Kashmir) goats', 210),
    ('9a21cb62-9424-421d-bf3e-9d6e4e1cb612', 'Angora', 'Angora wool comes from Angora rabbits', 540),
    ('d1ad9010-7545-4d3a-9e75-d4af771ea627', 'Camel Hair', 'Most camel hair comes from Bactrian camels', 50),
    ('1d9e3589-365a-44e9-aa4e-57a042cd5757', 'Qiviut', 'Qiviut is wool that comes from the undercoat of the arctic muskox', 1200);

insert into stocks (product_id, count) values
	('dd149ab6-f1be-4ba1-9b47-d5db239eb45e', 10),
    ('e3315493-c923-4412-8c14-e7ade4a55bb2', 21),
    ('fa3ddd66-3f98-4d84-a4e6-a89f0c047693', 133),
    ('65ca670d-1320-4773-9ac2-82a4fcf1bbda', 42),
    ('6f407c55-605b-4155-a881-84565aff130a', 53),
    ('9a21cb62-9424-421d-bf3e-9d6e4e1cb612', 43),
    ('d1ad9010-7545-4d3a-9e75-d4af771ea627', 74),
    ('1d9e3589-365a-44e9-aa4e-57a042cd5757', 18);
