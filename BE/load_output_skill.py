import os
from typing import Dict, Any

def load_agent_output(filename: str, subfolder: str = "outputs") -> Dict[str, Any]:
    """
    ~/.hermes/ 하위 폴더에 저장된 특정 결과물 파일의 내용을 읽어와 에이전트에게 제공합니다.
    
    :param filename: 읽어올 파일 이름 (예: 'api_spec.md')
    :param subfolder: 파일이 저장된 하위 폴더명 (기본값: outputs)
    :return: 파일 내용 및 로드 결과 상태
    """
    try:
        # 1. 파일 경로 설정
        home_dir = os.path.expanduser("~")
        file_path = os.path.join(home_dir, ".hermes", subfolder, filename)
        
        # 2. 파일 존재 여부 확인
        if not os.path.exists(file_path):
            return {
                "status": "error",
                "message": f"요청하신 파일이 해당 경로에 존재하지 않습니다: {file_path}"
            }
            
        # 3. 파일 읽기
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        return {
            "status": "success",
            "message": "파일을 성공적으로 불러왔습니다.",
            "filename": filename,
            "content": content
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": f"파일을 읽는 중 오류가 발생했습니다: {str(e)}"
        }

# Hermes Agent가 스킬을 인식할 수 있도록 메타데이터 정의
SKILL_MANIFEST = {
    "name": "load_agent_output",
    "description": "과거에 저장했던 특정 결과물 파일의 내용을 파일 시스템에서 읽어와 컨텍스트에 로드할 때 사용합니다.",
    "parameters": {
        "type": "object",
        "properties": {
            "filename": {"type": "string", "description": "읽어올 파일명 (예: api_spec.md)"},
            "subfolder": {"type": "string", "description": "파일이 위치한 폴더명 (기본값: outputs)"}
        },
        "required": ["filename"]
    }
}