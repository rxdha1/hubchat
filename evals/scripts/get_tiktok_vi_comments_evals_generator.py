from create_yaml_data import create_yaml, create_data
from create_tiktok_vi_comments_registry_data import create_tiktok_vi_comments_registry_data
from tiktok_comments_evals_questions_ideals import evals_questions_ideals

for item in evals_questions_ideals:
    question = item["question"]
    ideal = item["ideal"]
    eval_name = item["eval_name"]
    criteria = item["criteria"]

    create_yaml(eval_name, criteria, question)
    registry_data = create_tiktok_vi_comments_registry_data(ideal, question)
    create_data(eval_name, registry_data)